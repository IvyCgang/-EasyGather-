const db = require('../db')

// 註冊使用者
module.exports.signUp = async (db, obj) =>{    
    try {
        console.log(obj);
        console.log("before-singUp");
        //Execute the SQL query
        const [{ affectedRows }] = await db.query(
            "INSERT IGNORE INTO user (uID, userMall) VALUES (?,?)",
            [
                obj.uID,
                obj.userMall,
                //obj.userName,
                //obj.googleAccount,
            ],
        );
        console.log("after-signUp");
        return affectedRows;
    } 
    catch (error) {
        console.error("Error adding User:", error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
};

//
//module.exports.getUser = async (account) => {
//    const [records] = await db.query("SELECT * FROM user WHERE `account` = '" + account + "'")
//        console.log("search user connecting");
//        return records;
//}
//
//
//module.exports.editUser = async (obj, uID = 0) => {
//    const [{affectedRows}] = await db.query("UPDATE user SET account = ?, password = ?, userName = ?, googleAccount = ? WHERE uID = " + uID,
//        [
//            obj.account,
//            obj.password,
//            obj.userName,
//            obj.googleAccount,
//        ],(err, result)=> {
//            if (err)
//            {
//               console.log(err)
//            }
//            else {
//                console.log("connected!")
//            }
//        }
//    )
//}
//
//
//module.exports.deleteUser = async (uID) => {
//    const [{affectedRows}] = await db.query("DELETE FROM user WHERE uID = " + uID)
//        console.log("after-addJourney");
//    return affectedRows;
//}

