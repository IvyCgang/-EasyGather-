const express = require('express');
const router = express.Router();
const service = require('../services/matchVote.service');


router.post('/returnMatchVote/:vID', async (req, res) => {
   const matchVote = await service.getMatchVote(req.params.vID)
     if (matchVote.length == 0)
        res.status(404).json('no record with vID: ' + req.params.vID)
    else
        res.send(matchVote)
})



module.exports = router;
