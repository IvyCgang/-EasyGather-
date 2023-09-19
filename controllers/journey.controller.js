const express = require('express'),
    router = express.Router()

const service = require('../services/journey.service')


//http://163.22.17.145:3000/api/journey/
router.get('/', async(req, res) => {
    const journey = await service.getAllJourney()
    res.send(journey)
})


router.get('/:jID', async(req, res) => {
    const journey = await service.getJourneyById(req.params.jID)
	if (journey.length == 0)
		res.status(404).json('no record with jID: ' + req.params.jID)
	else
    res.send(journey)
})

router.delete('/:jID', async(req, res) => {
    const affectedRows = await service.deleteJourney(req.params.jID)
        if (affectedRows == 0)
                res.status(404).json('no record with jID: ' + req.params.jID)
        else
    res.send('delete successfully.')
})



router.post('/', async(req, res) => {
    await service.addJourney(req.body)
    res.status(201).send('add successfully.')
})


module.exports = router;
