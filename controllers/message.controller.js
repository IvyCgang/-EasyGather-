const express = require('express');
const router = express.Router();
const service = require('../services/message.service')


router.post('/getAllMessage/:chatID', async (req, res) => {
   const message = await service.getMessageByID(req.params.chatID)
     if (message.length == 0)
        res.status(404).json('no record with chatID: ' + req.params.chatID)
    else
        res.send(message)
})


module.exports = router;
