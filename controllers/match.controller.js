const express = require('express');
const router = express.Router();
const service = require('../services/match.service');

router.post('/:eID', async (req, res) => {
    try {
        const memberJourney = await service.getMemberJourney(req.params.eID);
        
        if (memberJourney.length === 0) {
            res.status(404).json('No record with eID: ' + req.params.eID);
        } else {
            const availableTimeSlots = await service.findAvailableTime(memberJourney, req.params.eID);
            res.json(availableTimeSlots);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
});

module.exports = router;

