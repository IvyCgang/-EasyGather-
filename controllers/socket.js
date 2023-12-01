const express = require('express');
const router = express.Router();
const db = require('../db');
const app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const moment = require('moment-timezone');

var allUsers = [];
var chatRooms = [];
var eID = [];


function emitUsers(chatRoomId) {
    io.to(chatRoomId).emit('users', chatRooms[chatRoomId].users);
    console.log(`Users in chat room ${chatRoomId}:`, chatRooms[chatRoomId].users);
}

function removeUser(chatRoomId, userName) {
    chatRooms[chatRoomId].users = chatRooms[chatRoomId].users.filter(function(ele) {
        return ele !== userName;
    });
}


io.on('connection', function (socket) {
    var userName = socket.request._query.userName;
    var chatRoomId = socket.request._query.chatRoomId; // 從查詢參數中獲取聊天室 ID

    if (!chatRooms[chatRoomId]) {
        chatRooms[chatRoomId] = { users: [], messages: [] };
	db.query(
            "INSERT INTO Chat (chatID, eID) VALUES (?, ?)",
            [chatRoomId, eId]
        ).then(([result]) => {
            console.log(`ChatRoomId: ${chatRoomId} 資料已成功插入到 Chat 資料表`);
        }).catch((error) => {
            console.error(`插入 ChatRoomId 到 Chat 資料表時出錯:`, error);
        });
    }


    chatRooms[chatRoomId].users.push(userName);
    socket.join(chatRoomId);

    var joinMsg = `🔥👤 ${userName} has joined ${chatRoomId}! 😎🔥`;
    console.log(joinMsg);

    socket.on('disconnect', () => {
        var disMsg = `${userName} has left ${chatRoomId}! 😭😭`;
        console.log(disMsg);

        removeUser(chatRoomId, userName);
        emitUsers(chatRoomId);
    });


socket.on('message', async (data) => {
    try {
        console.log(`👤 ${data.userName} 在 ${chatRoomId} 中說: ${data.message}`);

        // 在這裡插入訊息到 message 資料表
        const [{ insertId }] = await db.query(
            "INSERT INTO message (chatID, userMall,  messageSendTime, messageContent) VALUES (?, ?, ?, ?)",
            [chatRoomId, new Date(), data.message]
        );

        const messageData = {
            chatID: chatRoomId,
	    userMall: data.userName,
            messageSendTime: new Date(),
            messageContent: data.message
        };

        // 將消息保存到聊天室的消息列表中
        chatRooms[chatRoomId].messages.push(messageData);
        
        // 使用 io.to(chatRoomId).emit 傳送消息給聊天室中的所有客戶端
        io.to(chatRoomId).emit('message', messageData);
    } catch (error) {
        console.error(`將消息插入到 message 資料表時出錯:`, error);
    }
});

    socket.on('getChatMessages', async (chatRoomId) => {
    try {
        // 在這裡查詢指定 chatID 的所有訊息
        const [messages] = await db.query(
            "SELECT * FROM message WHERE chatID = ?",
            [chatRoomId]
        );

        // 將查詢結果傳送給客戶端
        socket.emit('chatMessages', messages);
    } catch (error) {
        console.error(`查詢 chatID ${chatRoomId} 的訊息時出錯:`, error);
    }
});



    socket.on('returnMessage',(data) => {
        console.log(`收到 ${data.userId} 收回訊息`);
        console.log(data.returnMessage);
        io.to(chatRoomId).emit('returnMessage',data)
        console.log(data);
    })

    let hasSentMessage1 = false;
    let hasSentMessage2 = false;
    const utcTime = '2023-10-04T07:21:00Z';
    
    const taiwanTargetTime = moment.utc(utcTime).tz('Asia/Taipei');
    console.log('預期時間',taiwanTargetTime);
    



    const checkTime = () => {
    const currentTime = new Date();
    const taiwanCurrentTime = moment(currentTime).tz('Asia/Taipei');
    data1 = {
        "activityName": '測試名稱',
        "activityTime": taiwanCurrentTime.toString(),
        "activityLocation": '測試地點',
        "activityMemberName": '測試成員'};
    if ((taiwanCurrentTime >= taiwanTargetTime) && (hasSentMessage1 == false)) {
        io.to(chatRoomId).emit('result', data1);
        console.log(data1);
        hasSentMessage1 = true;
    }
    data2 = {"activityVote":"true"};
    if ((taiwanCurrentTime >= taiwanTargetTime) && (hasSentMessage2 == false)) {
        io.to(chatRoomId).emit('resultVote', data2);
        console.log(data2);
        hasSentMessage2 = true;
    }

    };
    const timer = setInterval(checkTime, 1000);


  
});

//app.post('/api/receive-json', (req, res) => {
//    const jsonData = req.body;
//
//    console.log('Received JSON data:', jsonData);
//
//    res.status(201).send('add successfully.');
//})











module.exports = router;
