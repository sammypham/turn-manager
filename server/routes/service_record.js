const express = require('express');
const { Service_Record } = require('../models/service_record');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { service, technician } = req.body

        const newServiceRecord = new Service_Record(
            {
                service: service._id,
                technician: technician._id,
                time: Date()
            }
        );

        await newServiceRecord.save()

        res.status(200).json({});
    } catch (error) {
        console.error(error);

        res.status(500).json({});
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { turn, service } = req.body

        const updatedServiceRecord = await Service_Record.findByIdAndUpdate(
            turn._id,
            {
                service: service._id
            }
        );

        res.status(200).json({});
    } catch (error) {
        console.error(error);

        res.status(500).json({});
    }
});

module.exports = router