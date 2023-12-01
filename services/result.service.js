const db = require('../db')

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


module.exports.addResult = async (db, obj) =>{
        try {
     console.log(obj);
     console.log("before-addResult");

      //Execute the SQL query
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



module.exports.countById = async (oID) => {
	const [records] = await db.query("SELECT userMall FROM `resultOfVote` WHERE oID = ? AND status = 1", [oID])
	console.log("counting");
	return records;
}

module.exports.hightest = async (vID) => {
	const [records] = await db.query("SELECT oID, SUM(status) AS statusCount FROM resultOfVote WHERE vID = ? GROUP BY oID LIMIT 1", [vID])
	console.log("Find the hightest oID");
	return records;
}

