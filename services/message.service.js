const db = require('../db')


module.exports.getMessageByID = async () => {
        const [records] = await db.query("SELECT * FROM message")
        return records;
}
