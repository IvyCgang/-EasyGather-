// socket.js
const express = require('express');
const router = express.Router();

module.exports = function (io) {
    var chatRooms = {};

    io.on('connection', function (socket) {
        socket.on('joinRoom', function (data) {
            // 當使用者加入聊天室時
            var userName = data.userName;
            var chatRoomId = data.chatRoomId;

            // 建立聊天室若不存在
            if (!chatRooms[chatRoomId]) {
                chatRooms[chatRoomId] = { users: [], messages: [] };
            }

            // 加入聊天室
            socket.join(chatRoomId);
            chatRooms[chatRoomId].users.push(userName);

            // 發送加入聊天室的訊息
            var joinMsg = `🔥👤 ${userName} has joined ${chatRoomId}! 😎��`;
            io.to(chatRoomId).emit('message', { userName: 'System', message: joinMsg });

            // 發送聊天室成員更新
            io.to(chatRoomId).emit('users', chatRooms[chatRoomId].users);

            // 監聽離開聊天室事件
            socket.on('disconnect', function () {
                var disMsg = `${userName} has left ${chatRoomId}! 😭😭`;
                io.to(chatRoomId).emit('message', { userName: 'System', message: disMsg });

                // 移除離開的使用者
                chatRooms[chatRoomId].users = chatRooms[chatRoomId].users.filter(function (ele) {
                    return ele !== userName;
                });

                // 發送聊天室成員更新
                io.to(chatRoomId).emit('users', chatRooms[chatRoomId].users);
            });

            // 監聽聊天訊息事件
            socket.on('message', function (data) {
                console.log(`👤 ${data.userName} in ${chatRoomId} : ${data.message}`);
                chatRooms[chatRoomId].messages.push(data);
                io.to(chatRoomId).emit('message', data);
            });

            // 監聽其他事件
            socket.on('returnMessage', function (data) {
                console.log(`收到 ${data.userId} 收回訊息`);
                console.log(data.returnMessage);
                io.to(chatRoomId).emit('returnMessage', data);
                console.log(data);
            });

            // 監聽時間檢查事件
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
    });

    //const PORT = 3000;

    //io.listen(PORT, '192.168.56.1', () => {
    
};
module.exports = router;
