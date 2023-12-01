const express = require('express');


const router = express.Router();
//router.use(bodyParser.json());

const service = require('../services/event.service')


//router.post('/xxx', (req, res) => {
    // Access the JSON data from the request body
  //  const jsonData = req.body;

    // You can now work with the JSON data as needed
    //console.log('Received JSON data:', jsonData);

    // Respond with a success message
    //res.json({message: 'JSON data received successfully'});
//});


//http://163.22.17.145:3000/api/journey/
router.get('/', async (req, res) => {
    const event = await service.getAllEvent()
    res.send(event)
})


router.post('/getAllEvent/:userMall', async (req, res) => {
    const event = await service.getEventById(req.params.userMall)
    if (event.length == 0)
        res.status(404).json('no record with userMall: ' + req.params.userMall)
    else
        res.send(event)
})

router.delete('/deleteEvent/:eID', async (req, res) => {
    const affectedRows = await service.deleteEvent(req.params.eID)
    if (affectedRows == 0)
         res.status(404).json({ error: 'No record with eID: ' + req.params.eID });
     
    else {
        res.status(200).json({ message: 'Delete successfully.' });
    }
})

router.post('/deleteMyselfFromEvent/:eID/:userMall', async (req, res) => {
	const {eID, userMall} = req.params;
    const affectedRows = await service.deleteMyselfFromEvent(eID, userMall);
    if (affectedRows == 0)
         res.status(404).json({ error: 'No record with eID: ' + req.params.eID });
    else {
        res.status(200).json({ message: 'Delete myself successfully.' });
    }
})

router.post('/insertEvent', async (req, res) => {
    console.log(req.body);
    try {
            await service.addEvent(req.db, req.body);
        res.status(200).json({ message: '新增成功' });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }
})

router.put('/updateEvent/:eID', async (req, res) => {
    const affectedRows = await service.editEvent(req.body, req.params.eID)
        if (affectedRows == 0)
                res.status(404).json({ message: 'No record with eID: ' + req.params.eID})
        else
                res.send('update successfully')
        })


router.post('/getEventByFriend/:friends', async (req, res) => {
    try {
        const events = await service.getEventByFriends(req.params.friends);

        if (events.length === 0) {
            res.status(404).json({ message: 'No record with Friends: ' + req.params.friends });
        } else {
            res.status(200).json(events);
        }
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
