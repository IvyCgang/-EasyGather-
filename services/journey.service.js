const db = require('../db')

module.exports.getAllJourney = async () => {
	const [records] = await db.query("SELECT * FROM journey")
	return records;
}

module.exports.getJourneyById = async (userMall) => {
        const [records] = await db.query("SELECT * FROM journey WHERE `userMall` = '" + userMall + "'")
        console.log("select connecting");
	return records;
}

module.exports.deleteJourney = async (jID) => {
        const [{affectedRows}] = await db.query("DELETE FROM journey WHERE jID = " + jID)
        console.log("after-addJourney");
     return affectedRows;
}

//<<<<<<< HEAD

module.exports.editJourney = async (obj, jID = 0) => {
	const [{affectedRows}] = await db.query("UPDATE journey SET userMall = ?, journeyName = ?, journeyStartTime = ?, journeyEndTime = ?, isAllDay = ?, location = ?, remindStatus = ?, remindTime = ?, remark = ?, color = ? WHERE jID = " + jID,
	[
         obj.userMall,
         obj.journeyName,
         obj.journeyStartTime,
         obj.journeyEndTime,
         obj.isAllDay,
         obj.location,
         obj.remindStatus,
         obj.remindTime,
         obj.remark,
         obj.color,
       ],(err, result)=> {
	       if (err)
       {
	       console.log(err)
	}else{
		console.log("connected!")
	}
})
}



module.exports.addJourney = async (db, obj) =>{

//	console.log(obj);
        
	try {
     console.log(obj);
     console.log("before-addJourney");

      //Execute the SQL query
     const [{ affectedRows }] = await db.query(
       "INSERT INTO journey (userMall, journeyName, journeyStartTime, journeyEndTime, isAllDay, location, remindStatus, remindTime, remark, color) VALUES (?,?,?,?,?,?,?,?,?,?)",
       [
         obj.userMall,
         obj.journeyName,
         obj.journeyStartTime,
         obj.journeyEndTime,
         obj.isAllDay,
         obj.location,
         obj.remindStatus,
         obj.remindTime,
         obj.remark,
         obj.color,
       ],
     );
     console.log("after-addJourney");
     return affectedRows;
   } catch (error) {
     console.error("Error adding journey:", error.message);
     throw error; // Rethrow the error to be handled by the caller
   }
};        
//		const response = {
  //         message: '新增成功',
    //        affectedRows: affectedRows
      //  };

        //return response;
//     catch (error) {
  //       如果有錯誤，建立 JSON 錯誤回應物件
    //    const errorResponse = {
      //      error: '發生錯誤'
        //};

//=======
//module.exports.addJourney = async (obj) => {
//  try {
//    console.log(obj);
//    console.log("before-addJourney");
//
//    // Execute the SQL query
//    const [{ affectedRows }] = await db.query(
//      "INSERT INTO journey (uID, journeyName, journeyStartTime, journeyEndTime, isAllDay, location, remindStatus, remindTime, remark, color) VALUES (?,?,?,?,?,?,?,?,?,?)",
//      [
//        obj.uID,
//        obj.journeyName,
//        obj.journeyStartTime,
//        obj.journeyEndTime,
//        obj.isAllDay,
//        obj.location,
//        obj.remindStatus,
//        obj.remindTime,
//        obj.remark,
//        obj.color,
//      ],
//    );
//    console.log("after-addJourney");
//    return affectedRows;
//  } catch (error) {
//    console.error("Error adding journey:", error.message);
//    throw error; // Rethrow the error to be handled by the caller
//  }
//};
//>>>>>>> 3969764f3c9841e762e5e78a3c8dc15174ff8b1f
