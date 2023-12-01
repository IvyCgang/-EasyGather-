const express = require('express');
const router = express.Router();
const service = require('../services/result.service')

//http://163.22.17.145:3000/api/journey/

router.post('/getAllResult/:vID/:userMall', async (req, res) => {
   const { vID, userMall } = req.params;
   const result = await service.getResultById(vID, userMall);
     if (result.length == 0) {
        res.status(404).json()
     } else {
        res.status(200).json(result);
     }
})

router.post('/insertResult', async (req, res) => {
    console.log(req.body);
    try {
            await service.addResult(req.db, req.body);
        res.status(200).json({ message: '新增成功' });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }
})

router.put('/updateResult/:voteResultID', async (req, res) => {
    const affectedRows = await service.editResult(req.body, req.params.voteResultID);
        if (affectedRows == 0)
                res.status(404).json({ message: 'No record with ID: ' + req.params.voteResultID})
        else
                res.send('update successfully')
        })


router.post('/count/:oID', async (req, res) => {
   const count = await service.countById(req.params.oID);
     if (count.length == 0) {
        res.status(404).json(count)
     } else {
        res.status(200).json(count);
     }
})

router.post('/hightest/:vID', async (req, res) => {
	const hightest = await service.hightest(req.params.vID);
	if (hightest.length == 0) {
		res.status(404).json({ message: 'No record with ID: ' + req.params.vID})
	} else {
		res.status(200).json(hightest);
	}
})





//router.post('/finalCount/:vID', async (req, res) => {
//   const count = await service.countById(req.params.vID);
//     if (finalCount.length == 0) {
//        res.status(404).json('no record with vID: ' + req.params.vID)
//     } else {
//        res.status(200).json(最高票為);
//     }
//})
//
//

module.exports = router;
