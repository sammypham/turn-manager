const express = require('express');
const { Service_Record } = require('../models/service_record');
const { Service } = require('../models/service');
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

router.post('/skip', async (req, res) => {
    try {
        const { turn, technician } = req.body

        if (turn._id) {
            const updatedRecord = await Service_Record.findByIdAndUpdate(
                turn._id,
                {
                    service: null
                }
            )

        } else {
            const newServiceRecord = new Service_Record(
                {
                    service: null,
                    technician: technician._id,
                    time: Date()
                }
            );

            await newServiceRecord.save()
        }

        res.status(200).json({});
    } catch (error) {
        console.error(error);

        res.status(500).json({});
    }
})

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

router.delete('/delete', async (req, res) => {
    try {
        const { business_id, turn_id } = req.query;

        const deletedServiceRecord = await Service_Record.findByIdAndDelete(turn_id);

        res.status(202).json({});
    } catch (error) {
        console.error(error);

        res.status(500).json({});
    }
})

module.exports = router