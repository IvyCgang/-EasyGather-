const express = require('express');


const router = express.Router();
//router.use(bodyParser.json());

const service = require('../services/votingOption.service')

router.post('/insertVotingOption', async (req, res) => {
    console.log(req.body);
    try {
            await service.addVotingOption(req.db, req.body);
        res.status(200).json({ message: '新增成功' });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }
})

// 尋找
router.post('/getAllVotingOption/:vID', async (req, res) => {
   const votingOption = await service.getAllVotingOption(req.params.vID)
     if (votingOption.length == 0)
        res.status(404).json('no record with this vID: ' + req.params.vID)
    else
        res.send(votingOption)
})


// 編輯
router.put('/updateVotingOption/:oID', async (req, res) => {
    const affectedRows = await service.editVotingOption(req.body, req.params.oID)
        if (affectedRows == 0)
                res.status(404).json({ message: 'No record with this oID: ' + req.params.oID})
        else
                res.send('votingOption information update successfully')
        })


// 刪除使用者
router.delete('/deleteVotingOption/:vID', async (req, res) => {
        const affectedRows = await service.deleteVotingOption(req.params.vID)
    if (affectedRows == 0)
         res.status(404).json({ error: 'No record with this vID: ' + req.params.vID });

    else {
        res.status(200).json({ message: 'Delete votingOption successfully.' });
    }
})

module.exports = router;
