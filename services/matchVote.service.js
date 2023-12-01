const db = require('../db')

module.exports.getMatchVote = async () => {
        const [records] = await db.query("SELECT * FROM journey")
        return records;
}
