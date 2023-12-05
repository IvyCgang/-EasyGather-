const db = require('../db');
const { io } = require('socket.io-client');

module.exports.getResultById = async (vID, userMall) => {
        const [records] = await db.query("SELECT * FROM resultOfVote WHERE `vID` = ? AND `userMall` = ?" , [vID, userMall]);
        console.log("select connecting");
        return records;
}

module.exports.editResult = async (obj, voteResultID = 0) => {
        const [{affectedRows}] = await db.query("UPDATE resultOfVote SET vID = ?, userMall = ?, oID = ?, status = ? WHERE voteResultID = " + voteResultID,
        [
            obj.vID,
            obj.userMall,
            obj.oID,
            obj.status,
        ],(err, result)=> {
               if (err)
       {
               console.log(err)
        }else{
                console.log("connected!")
        }
})
};

module.exports.addResult = async (db, obj) => {
    try {
        console.log(obj);
        console.log("before-addResult");

        // Check if the same record already exists
        const [existingRecords] = await db.query(
            "SELECT * FROM resultOfVote WHERE vID = ? AND userMall = ? AND oID = ?",
            [obj.vID, obj.userMall, obj.oID]
        );

        if (existingRecords.length > 0) {
            console.log("Record already exists. Not adding a new one.");
            return 0; // Indicate that no new record was added
        }

        // If the record doesn't exist, then execute the SQL query to insert
        const [{ affectedRows }] = await db.query(
            "INSERT INTO resultOfVote (vID, userMall, oID, status) VALUES (?,?,?,?)",
            [
                obj.vID,
                obj.userMall,
                obj.oID,
                obj.status,
            ],
        );

        console.log("after-addResult");
        return affectedRows;
    } catch (error) {
        console.error("Error adding result:", error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
};
//module.exports.addResult = async (db, obj) =>{
//        try {
//     console.log(obj);
//     console.log("before-addResult");
//
//      //Execute the SQL query
//     const [{ affectedRows }] = await db.query(
//       "INSERT INTO resultOfVote (vID, userMall, oID, status) VALUES (?,?,?,?)",
//       [
//        obj.vID,
//        obj.userMall,
//        obj.oID,
//        obj.status,
//       ],
//     );
//     console.log("after-addResult");
//     return affectedRows;
//   } catch (error) {
//     console.error("Error adding result:", error.message);
//     throw error; // Rethrow the error to be handled by the caller
//   }
//};

module.exports.countById = async (oID) => {
	const [records] = await db.query("SELECT userMall FROM `resultOfVote` WHERE oID = ? AND status = 1", [oID])
	console.log("counting");
	return records;
}



module.exports.hightest = async (vID) => {
    try {
        // 找到票數最高的選項
        const [highestOption] = await db.query("SELECT oID, SUM(status) AS statusCount FROM resultOfVote WHERE vID = ? GROUP BY oID ORDER BY statusCount DESC LIMIT 1", [vID]);
        if (!highestOption || highestOption.length === 0) {
            throw new Error('No data found for the highest option.');
        }
        const { oID } = highestOption[0];
        console.log("Find the highest oID:", oID);

        // 獲取選項內容
        const [optionContentData] = await db.query("SELECT votingOptionContent FROM votingOption WHERE oID = ?", [oID]);
        if (!optionContentData || optionContentData.length === 0) {
            throw new Error('No data found for the option content.');
        }
        const { votingOptionContent } = optionContentData[0];
        console.log("Found OptionContent:", votingOptionContent);

        // 從 OptionContent 解析開始和結束時間
        const startTime = votingOptionContent.substring(0, 12);
        const endTime = votingOptionContent.substring(14);

        // 獲取對應的 eID
        const [voteData] = await db.query("SELECT eID FROM vote WHERE vID = ?", [vID]);
        if (!voteData || voteData.length === 0) {
            throw new Error('No data found in vote for the given vID.');
        }
        const { eID } = voteData[0];
        console.log("Found corresponding eID:", eID);

        // 更新事件表
        await db.query("UPDATE event SET eventFinalStartTime = ?, eventFinalEndTime = ?, state = ? WHERE eID = ?", [startTime, endTime, 1, eID]);

	const socket = io("http://163.22.17.145:3000",{
    transports: ["websocket"] ,
    query : {'userName': '系統訊息', 'chatRoomId': eID, 'eID': eID}
});
	    console.log(new Date());
	const messageContent = `投票結果：\n最高票數的選項為：${votingOptionContent}`;
        socket.emit('message',{
                "chatRoomId":eID,
                "userMall":'「揪」easy 官方小精靈',
                "messageContent": messageContent,
                "messageSendTime":formatDateTime(new Date()),
        });


        return {};
    } catch (error) {
        console.error("Error in highest:", error);
        throw error;
    }
};

function formatDateTime(date) {
    const pad = (number, length = 2) => String(number).padStart(length, '0');

    let formattedDate =
        date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate()) + ' ' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes()) + ':' +
        pad(date.getSeconds()) + '.' +
        pad(date.getMilliseconds(), 3);

    return formattedDate;
}

