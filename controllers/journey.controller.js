const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const service = require('../services/journey.service')


router.post('/xxx', (req, res) => {
    // Access the JSON data from the request body
    const jsonData = req.body;

    // You can now work with the JSON data as needed
    console.log('Received JSON data:', jsonData);

    // Respond with a success message
    res.json({message: 'JSON data received successfully'});
});


//http://163.22.17.145:3000/api/journey/
router.get('/', async (req, res) => {
    const journey = await service.getAllJourney()
    res.send(journey)
})


router.get('/:jID', async (req, res) => {
    const journey = await service.getJourneyById(req.params.jID)
    if (journey.length == 0)
        res.status(404).json('no record with jID: ' + req.params.jID)
    else
        res.send(journey)
})

router.delete('/:jID', async (req, res) => {
    const affectedRows = await service.deleteJourney(req.params.jID)
    if (affectedRows == 0)
        res.status(404).json('no record with jID: ' + req.params.jID)
    else
        res.send('delete successfully.')
})


router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await service.addJourney(req.body);
        res.status(201).json({ message: '新增成功' });
    } catch (error) {
        res.status(500).json({ error: '發生錯誤' });
    }

})


module.exports = router;
