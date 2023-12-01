const express = require('express');
const router = express.Router();
const db = require('../db'); // 假设您已经有一个数据库连接模块

// 获取 resultOfVote 数据并计算最高票数的选项
router.post('', async (req, res) => {
    try {
        const [votes] = await db.query("SELECT oID, COUNT(status) AS voteCount FROM resultOfVote WHERE status = 1 GROUP BY oID ORDER BY voteCount DESC LIMIT 1");
        if (votes.length > 0) {
            const highestVote = votes[0];
            res.json({ highestOption: highestVote.oID, voteCount: highestVote.voteCount });
        } else {
            res.json({ message: "No votes found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

