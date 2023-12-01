const db = require('../db')

//module.exports.addVote = async (db, obj) =>{
//
//        console.log(obj);
//
//        try {
//     console.log(obj);
//     console.log("before-addVote");
//
//     // Execute the SQL query
//     const [{ result }] = await db.query(
//       "INSERT INTO vote (eID, userMall, voteName, endTime, singleOrMultipleChoice) VALUES (?,?,?,?,?)",
//       [
//         obj.eID,
//         obj.userMall,
//         obj.voteName,
//         obj.endTime,
//         obj.singleOrMultipleChoice
//       ],
//     );
//     
////     const [[{ vID }]] = await db.query("SELECT LAST_INSERT_ID() as vID");
//     
//     
//     console.log("after-addVote");
//     
////return affectedRows;
//     return result;
//     } catch (error) {
//     console.error("Error adding Vote:", error.message);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

module.exports.addVote = async (db, obj) => {
    console.log(obj);
    try {
        console.log("before-addVote");

        // 執行 SQL 插入查詢
        const [result] = await db.query(
            "INSERT INTO vote (eID, userMall, voteName, endTime, singleOrMultipleChoice) VALUES (?,?,?,?,?)",
            [
                obj.eID,
                obj.userMall,
                obj.voteName,
                obj.endTime,
                obj.singleOrMultipleChoice
            ]
        );

        console.log("after-addVote");
        return result;  // 返回插入操作的結果對象
    } catch (error) {
        console.error("Error adding Vote:", error.message);
        throw error;  // 重新拋出錯誤以便調用者處理
    }
};



module.exports.getAllVote = async (eID) => {
    const [records] = await db.query("SELECT * FROM vote WHERE eID = " + eID )
        console.log("search vote connecting");
        return records;
}


module.exports.editVote = async (obj, vID = 0) => {
    const [{affectedRows}] = await db.query("UPDATE vote SET eID = ?, userMall = ?, voteName = ?, endTime = ?, singleOrMultipleChoice =? WHERE vID = " + vID,
        [
            obj.eID,
            obj.userMall,
            obj.voteName,
            obj.endTime,
            obj.singleOrMultipleChoice
        ],(err, result)=> {
            if (err)
            {
               console.log(err)
            }
            else {
                console.log("connected!")
            }
        }
    )
}


module.exports.deleteVote = async (vID) => {
    const [{affectedRows}] = await db.query("DELETE FROM vote WHERE vID = " + vID)
        console.log("after-addJourney");
    return affectedRows;
}

