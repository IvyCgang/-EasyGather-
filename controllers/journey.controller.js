const express = require('express');
//const bodyParser = require('body-parser');

const router = express.Router();
//router.use(bodyParser.json());

const service = require('../services/journey.service')


//router.post('/xxx', (req, res) => 
	// Access the JSON data from the request body
  //  const jsonData = req.body;

    // You can now work with the JSON data as needed
    //console.log('Received JSON data:', jsonData);

    // Respond with a success message
    //res.json({message: 'JSON data received successfully'});
//});


//http://163.22.17.145:3000/api/journey/
router.get('/', async (req, res) => {
    const journey = await service.getAllJourney()
    res.send(journey)
})


router.post('/getAllJourney/:userMall', async (req, res) => {
   const journey = await service.getJourneyById(req.params.userMall)
     if (journey.length == 0)
        res.status(404).json('no record with userMall: ' + req.params.userMall)
    else
        res.send(journey)
})

router.delete('/deleteJourney/:jID', async (req, res) => {
	const affectedRows = await service.deleteJourney(req.params.jID)
    if (affectedRows == 0)
	 res.status(404).json({ error: 'No record with jID: ' + req.params.jID });
     
    else {
        res.status(200).json({ message: 'Delete successfully.' });
    }
})


router.post('/insertJourney', async (req, res) => {
    console.log(req.body);
    try {
            await service.addJourney(req.db, req.body);
        res.status(200).json({ message: '新增成功' });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }
})

router.put('/updateJourney/:jID', async (req, res) => {
    const affectedRows = await service.editJourney(req.body, req.params.jID)
        if (affectedRows == 0)
		res.status(404).json({ message: 'No record with jID: ' + req.params.jID})
	else
		res.send('update successfully')
	})

module.exports = router;
