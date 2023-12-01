const express = require('express');


const router = express.Router();
//router.use(bodyParser.json());

const service = require('../services/vote.service')

//router.post('/insertVote', async (req, res) => {
//    console.log(req.body);
//    try {
//            const insertedVote = await service.addVote(req.db, req.body);
//        res.status(200).json({ message: 'The vID of this vote: ', vID: insertedVote.insertId });
//    } catch (error) {
//        res.status(500).json({ error: '發生錯誤' });
//    }
//})

router.post('/insertVote', async (req, res) => {
    console.log(req.body);
    try {
        const insertedVote = await service.addVote(req.db, req.body);
        res.status(200).json({vID:insertedVote.insertId });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }
});



router.post('/getAllVote/:eID', async (req, res) => {
   const vote  = await service.getAllVote(req.params.eID)
     if (vote.length == 0)
        res.status(404).json('no record with this vote of this event: ' + req.params.eID)
    else
        res.send(vote)
})


// 編輯
// http://163.22.17.145:3000/api/vote/updateVote
router.put('/updateVote/:vID', async (req, res) => {
    const affectedRows = await service.editVote(req.body, req.params.vID)
        if (affectedRows == 0)
                res.status(404).json({ message: 'No record with this vID: ' + req.params.vID})
        else
                res.send('Vote information update successfully')
        })


// 刪除
// http://163.22.17.145:3000/api/vote/deleteVote
router.delete('/deleteVote/:vID', async (req, res) => {
        const affectedRows = await service.deleteVote(req.params.vID)
    if (affectedRows == 0)
         res.status(404).json({ error: 'No record with this vID: ' + req.params.vID });

    else {
        res.status(200).json({ message: 'Delete vote successfully.' });
    }
})



module.exports = router;
