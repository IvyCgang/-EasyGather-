const db = require('../db')

module.exports.getAllEvent = async () => {
        const [records] = await db.query("SELECT * FROM event")
        return records;
}

module.exports.getEventById = async (userMall) => {
        const [records] = await db.query("SELECT * FROM event WHERE `userMall` = '" + userMall + "'")
	console.log("select event is connecting");
        return records;
}

module.exports.deleteEvent = async (eID) => {
        const [{affectedRows}] = await db.query("DELETE FROM event WHERE eID = " + eID)
        console.log("after-deleteEvent");
	return affectedRows;
}

module.exports.addEvent = async (db, obj) =>{

        console.log(obj);
        
        try {
     console.log(obj);
     console.log("before-addEvent");

     // Execute the SQL query
     const [{ affectedRows }] = await db.query(
       "INSERT INTO event (userMall, eventName, eventBlockStartTime, eventBlockEndTime, eventTime, timeLengthHours, eventFinalStartTime, eventFinalEndTime, state, matchTime, friends, location, remindStatus, remindTime, remark) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
       [
         obj.userMall,
         obj.eventName,
         obj.eventBlockStartTime,
         obj.eventBlockEndTime,
	 obj.eventTime,
	 obj.timeLengthHours,
         obj.eventFinalStartTime,
	 obj.eventFinalEndTime,
	 obj.state,
	 obj.matchTime,
	 obj.friends,
         obj.location,
         obj.remindStatus,
         obj.remindTime,
         obj.remark
       ],
     );
     console.log("after-addEvent");
     return affectedRows;
   } catch (error) {
     console.error("Error adding event:", error.message);
     throw error; // Rethrow the error to be handled by the caller
   }
 };        
        //      const response = {
         //  message: '新增成功',
           // affectedRows: affectedRows
        //};

       // return response;
   // } catch (error) {
        // 如果有錯誤，建立 JSON 錯誤回應物件
     //   const errorResponse = {
       //     error: '發生錯誤'
       // };

module.exports.editEvent = async (obj, eID = 0) => {
        const [{affectedRows}] = await db.query("UPDATE event SET userMall = ?, eventName = ?, eventBlockStartTime = ?, eventBlockEndTime = ?, eventTime = ?, timeLengthHours = ?, eventFinalStartTime = ?, eventFinalEndTime = ?, state = ?, matchTime = ?, friends = ?, location = ?, remindStatus = ?, remindTime = ?, remark = ? WHERE eID = " + eID,
        [
         obj.userMall,
         obj.eventName,
         obj.eventBlockStartTime,
         obj.eventBlockEndTime,
         obj.eventTime,
	obj.timeLengthHours,
	 obj.eventFinalStartTime,
	 obj.eventFinalEndTime,
	obj.state,
	obj.matchTime,
	obj.friends,
         obj.location,
         obj.remindStatus,
         obj.remindTime,
         obj.remark,
       ],(err, result)=> {
               if (err)
       {
               console.log(err)
        }else{
                console.log("connected!")
        }
})
}

//module.exports.getEventByFriends = async (friends) => {
//    const [records] = await db.query("SELECT * FROM event WHERE friends LIKE ?", [`%${friend}%`]);
//    return records;
//};

module.exports.getEventByFriends = async (friend) => {
    try {
        const [records] = await db.query("SELECT * FROM event WHERE friends LIKE ?", [`%${friend}%`]);
        return records;
    } catch (error) {
        console.error('Error retrieving events:', error);
        throw error;  // 將錯誤拋回以供上層處理
    }
};


module.exports.deleteMyselfFromEvent = async (eID, userMall) => {
	const [{records}] = await db.query("UPDATE event SET friends = REPLACE(friends, ?, \'\') WHERE eID = ?" , [userMall, eID]);
	console.log(" delete yourself from event now ");
	return records;
}

