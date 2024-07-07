// technicians.js
const express = require('express');
const { Technician } = require('../models/technician');
const { ObjectId } = require('mongodb');
const validateBusinessOwnership = require('../util/validateBusinessOwnership');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        validateBusinessOwnership(req, res);

        const technicians = await Technician.find({ business: new ObjectId(req.query.business_id) });

        return res.status(200).json({ techList: technicians });
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
});

router.post('/', async (req, res) => {
    try {
        validateBusinessOwnership(req, res);

        if (req.body.isEditing) {
            var technician = await Technician.findByIdAndUpdate(req.body._id, req.body);
            await technician.save();
            res.status(201).json({ techList: technician });
        } else {
            var technician = new Technician({
                business: new ObjectId(req.query.business_id),
                name: req.body.name,
                pin: req.body.pin,
            });
            await technician.save();
            res.status(201).json({ techList: technician });
        }
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        res.status(500).json();
    }
});

router.delete('/', async (req, res) => {
    try {
        validateBusinessOwnership(req, res);

        const deletedTechnician = await Technician.deleteOne({ _id: req.query.technician_id });

        res.status(201).json();
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
});

module.exports = router;