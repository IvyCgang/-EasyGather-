const express = require('express');
const router = express.Router();
const service = require('../services/match.service')

router.post('/:eID', async (req, res) => {
   const match = await service.match(req.params.eID);
	   if (match.length == 0) {    
		res.status(404).json('No record with eID: ' + req.params.eID);
    } else {
       // console.error('Error getting matching events:',+ req.params.eID);
       // res.status(500).json({ error: 'Internal Server Error' });
        res.send(match)
    }
})



module.exports = router;
