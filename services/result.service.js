const db = require('../db')

module.exports.getResultById = async (vID, userMall) => {
        const [records] = await db.query("SELECT * FROM resultOfVote WHERE `vID` = ? AND `userMall` = ?" , [vID, userMall]);
        console.log("select connecting");
        return records;
}

module.exports.editResult = async (obj, voteResultID = 0) => {
        const [{affectedRows}] = await db.query("UPDATE resultOfVote SET vID = ?, userMall = ?, oID = ?, VotingTime = ? WHERE voteResultID = " + voteResultID,
        [
            obj.vID,
            obj.userMall,
            obj.oID,
            obj.VotingTime,
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
       "INSERT INTO resultOfVote (vID, userMall, oID, VotingTime) VALUES (?,?,?,?)",
       [
        obj.vID,
        obj.userMall,
        obj.oID,
        obj.VotingTime,
       ],
     );
     console.log("after-addResult");
     return affectedRows;
   } catch (error) {
     console.error("Error adding result:", error.message);
     throw error; // Rethrow the error to be handled by the caller
   }
};
