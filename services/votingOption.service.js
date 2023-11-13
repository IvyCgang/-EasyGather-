const db = require('../db')

module.exports.addVotingOption = async (db, obj) =>{

        console.log(obj);

        try {
     console.log(obj);
     console.log("before-addVotingOption");

     // Execute the SQL query
     const [{ affectedRows }] = await db.query(
       "INSERT INTO votingOption (vID, votingOptionContent) VALUES (?,?)",
       [
         obj.vID,
         obj.votingOptionContent
       ],
     );
     console.log("after-addVotingOption");
     return affectedRows;
   } catch (error) {
     console.error("Error adding VotingOption:", error.message);
     throw error; // Rethrow the error to be handled by the caller
   }
 };



module.exports.getAllVotingOption = async (vID) => {
    const [records] = await db.query("SELECT * FROM votingOption WHERE `vID` = '" + vID + "'")
        console.log("search votingOption connecting");
        return records;
}


module.exports.editVotingOption = async (obj, oID = 0) => {
    const [{affectedRows}] = await db.query("UPDATE votingOption SET votingOptionContent =? WHERE oID = " + oID,
        [
            obj.votingOptionContent
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


module.exports.deleteVotingOption = async (vID) => {
    const [{affectedRows}] = await db.query("DELETE FROM votingOption WHERE vID = " + vID)
        console.log("after-addJourney");
    return affectedRows;
}
