const express = require('express');
const app = require('express')();
const path = require('path')
var server = require('http').Server(app);
var io = require('socket.io')(server);
const moment = require('moment-timezone');
const bodyparser = require('body-parser');
require('express-async-errors')
var eID = [];
var allUsers = [];
var chatRooms = [];


//module.exports = { app, server, io };



const db = require('./db'),
    journeyRoutes = require('./controllers/journey.controller'),
    userRoutes = require('./controllers/users.controller'),
    eventRoutes = require('./controllers/event.controller'),
    voteRoutes = require('./controllers/vote.controller'),
    votingOptionRoutes = require('./controllers/votingOption.controller'),
      resultRoutes = require('./controllers/result.controller'),
      matchRoutes = require('./controllers/match.controller'),
	messageRoutes = require('./controllers/message.controller'),
	highestVoteRoutes = require('./controllers/highestVote.controllers')

//static folder
app.use(express.static(path.join(__dirname,'web')));
app.use(function(req,res,next){
  req.db= db;
  next();
});
app.use(bodyparser.json())
app.use('/api/journey', journeyRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/user', userRoutes)
app.use('/api/vote', voteRoutes)
app.use('/api/votingOption', votingOptionRoutes)
app.use('/api/result', resultRoutes)
app.use('/api/match', matchRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/highestVote', highestVoteRoutes)
app.use(express.static(path.join(__dirname,'web')));
//app.use(cors());
//
//
//module.exports = { app, server, io };
//
//
//


app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong')
})
// function emitUsers() {
//     io.emit('users',allUsers);    
//     console.log('users',allUsers);
// }
function emitUsers(chatRoomId) {
    io.to(chatRoomId).emit('users', chatRooms[chatRoomId].users);
    console.log(`Users in chat room ${chatRoomId}:`, chatRooms[chatRoomId].users);
}
//// function removeUser(user) {
////     allUsers= allUsers.filter(function(ele){ 
////         return ele != user; 
////     });   
//// }
function removeUser(chatRoomId, userMall) {
    chatRooms[chatRoomId].users = chatRooms[chatRoomId].users.filter(function(ele) {
        return ele !== userMall;
    });
}
//
//socket listeners
// io.on('connection', function (socket) {
//     var userMall = socket.request._query.userMall;
//     allUsers.push(userMall);
//     emitUsers();
//     var msg = `🔥👤 ${userMall} has joined! 😎��`;
//     console.log(msg)

//     //broadcast when a user connects
//     io.emit('message', {
//         "message": msg
//     }
//     );
//     socket.on('disconnect', () => {       
      
//         var disMsg = `${userMall} has disconnected! 😭��`;
//         console.log(disMsg);
//         io.emit('message', {
//             "message": disMsg,
//         });
//         removeUser(userMall);
//         emitUsers()
//     });

//     socket.on('message', (data) => {
//         console.log(`�� ${data.userMall} : ${data.message}`)
//         io.emit('message', data);
//     });



// });




io.on('connection', function (socket) {
	console.log(socket);
    let userMall = socket.request._query.userName;
    let chatRoomId = socket.request._query.chatRoomId; 
	console.log('test');
	console.log(userMall);
    let eID = socket.request._query.eID;
    console.log(socket.request._query.chatRoomId);
    console.log(socket.request._query.eID);
	
    if (!chatRooms[chatRoomId]) {
        chatRooms[chatRoomId] = { users: [], messages: [] };

        // Check if a chatRoom with the same eID already exists
        db.query("SELECT * FROM chatRoom WHERE eID = ?", [eID])
            .then(([existingRecords]) => {
                if (existingRecords.length > 0) {
                    console.log(`ChatRoom with eID: ${eID} already exists.`);
                } else {
                    // Proceed with insertion if no existing record is found
                    db.query("INSERT INTO chatRoom (chatID, eID) VALUES (?, ?)", [chatRoomId, eID])
                        .then(([result]) => {
                            console.log(`ChatRoomId: ${chatRoomId} 資料已成功插入到 Chat 資料表`);
                        }).catch((error) => {
                            console.error(`插入 ChatRoomId 到 Chat 資料表時出錯:`, error);
                        });
                }
            })
            .catch((error) => {
                console.error(`檢查 eID 存在於 ChatRoom 資料表時出錯:`, error);
            });
    }	


    chatRooms[chatRoomId].users.push(userMall);
    socket.join(chatRoomId);


	db.query(
    "SELECT * FROM message WHERE chatID = ?",
    [chatRoomId]
).then(([messages]) => {
 messages.forEach((message) => {
            socket.emit('chatMessage', message);
        });
    }).catch((error) => {
        console.error(`查詢 chatID ${chatRoomId} 的訊息時出錯:`, error);
    });
	
	 // 查询聊天室的所有消息
    db.query("SELECT * FROM message WHERE chatID = ?", [chatRoomId])
        .then(([messages]) => {
            // 如果有消息，一次性发送所有消息
            if (messages.length > 0) {
                io.to(chatRoomId).emit('allChatMessages', messages);
            	console.log(chatRoomId);
	    }
        })
        .catch((error) => {
            console.error(`查询 chatID ${chatRoomId} 的消息时出错:`, error);
        });



	
    var joinMsg = `🔥👤 ${userMall} has joined ${chatRoomId}! 😎🔥`;
    console.log(joinMsg);

    // io.to(chatRoomId).emit('message', {
    //     "message": joinMsg
    // });

    socket.on('disconnect', () => {
        var disMsg = `${userMall} has left ${chatRoomId}! 😭😭`;
        console.log(disMsg);
        // io.to(chatRoomId).emit('message', {
        //     "message": disMsg,
        // });
        removeUser(chatRoomId, userMall);
        emitUsers(chatRoomId);
    });


    // 监听 matchCompleted 事件
//    socket.on('matchCompleted', (data) => {
//        console.log(`message: ${data.message}`);
        // 在这里可以进行进一步处理，比如将消息广播给聊天室的其他用户
//        io.to(chatRoomId).emit('matchCompleted', data);
//  });
//socket.on('disconnect', (data) => {
//	console.log(data);
//	chatRoomId = data.chatRoomId;
//	console.log('---------');
//	console.log(chatRoomId);
//})

socket.on('message', (data) => {
    console.log(`👤 ${data.userMall} 在 ${chatRoomId} 中說: ${data.messageContent}`);

    // 在這裡插入訊息到 message 資料表
    if (data.messageContent) {
        db.query(
            "INSERT INTO message (chatID, userMall, messageSendTime, messageContent) VALUES (?, ?, ?, ?)",
            [data.chatID, data.userMall, data.messageSendTime, data.messageContent]
        ).then(([result]) => {
            const messageData = {
                chatID: chatRoomId,
                userMall: data.userMall,
                messageSendTime: data.messageSendTime,
                messageContent: data.messageContent
            };

            // 將消息保存到聊天室的消息列表中
            chatRooms[chatRoomId].messages.push(messageData);

            // 使用 io.to(chatRoomId).emit 傳送消息給聊天室中的所有客戶端
            io.to(chatRoomId).emit('message', messageData);
        }).catch((error) => {
            console.error(`將消息插入到 message 資料表時出錯:`, error);
        });
    } else {
        console.error(`消息內容為空，無法插入到資料庫`);
    }
});

    
    socket.on('returnMessage',(data) => {
        console.log(`收到 ${data.userId} 收回訊息`);
        console.log(data.returnMessage);
        io.to(chatRoomId).emit('returnMessage',data)
        console.log(data);
    })


//   socket.on('getChatMessages', (chatRoomId.chatID) => {
//    // 在這裡查詢指定 chatID 的所有訊息
//    db.query(
//        "SELECT * FROM message WHERE chatID = ?",
//        [chatRoomId.chatID]
//    ).then(([messages]) => {
//        // 將查詢結果傳送給客戶端
//        io.to(chatRoomId).emit('chatMessages', messages);
//    }).catch((error) => {
//        console.error(`查詢 chatID ${chatRoomId} 的訊息時出錯:`, error);
//    });
//});

    let hasSentMessage1 = false;
    let hasSentMessage2 = false;
    const utcTime = '2023-10-04T07:21:00Z';
    
    const taiwanTargetTime = moment.utc(utcTime).tz('Asia/Taipei');
    console.log('預期時間',taiwanTargetTime);
    



//    const checkTime = () => {
//    const currentTime = new Date();
//    const taiwanCurrentTime = moment(currentTime).tz('Asia/Taipei');
//    data1 = {
//        "activityName": '測試名稱',
//        "activityTime": taiwanCurrentTime.toString(),
//        "activityLocation": '測試地點',
//        "activityMemberName": '測試成員'};
//    if ((taiwanCurrentTime >= taiwanTargetTime) && (hasSentMessage1 == false)) {
//        io.to(chatRoomId).emit('result', data1);
//        console.log(data1);
//        hasSentMessage1 = true;
//    }
//    data2 = {"activityVote":"true"};
//    if ((taiwanCurrentTime >= taiwanTargetTime) && (hasSentMessage2 == false)) {
//        io.to(chatRoomId).emit('resultVote', data2);
//        console.log(data2);
//        hasSentMessage2 = true;
//    }
//
//    };
//    const timer = setInterval(checkTime, 1000);
//

  
});

let chatRoomId = '';



app.post('/api/receive-json', (req, res) => {
    const jsonData = req.body;

    console.log('Received JSON data:', jsonData);

    res.status(201).send('add successfully.');
})
const PORT = 3000;

server.listen(PORT,'163.22.17.145',()=>{
    console.log('Server up and running at',PORT);
});
