const express = require('express');
const { Service } = require('../models/service');
const { ObjectId } = require('mongodb');
const { Business } = require('../models/business');
const validateBusinessOwnership = require('../util/validateBusinessOwnership');
const router = express.Router()

router.get('/', validateBusinessOwnership, async (req, res) => {
    try {

        const services = await Service.find({ business: new ObjectId(req.query.business_id) });

        return res.status(200).json({ serviceList: services });
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
})

router.post('/', validateBusinessOwnership,async (req, res) => {
    try {

        if (req.body.isEditing) {
            var services = await Service.findByIdAndUpdate(req.body._id, req.body)
            await services.save();
            res.status(201).json({ serviceList: services });
        }
        else {
            var services = new Service({
                business: new ObjectId(req.query.business_id),
                name: req.body.name,
                isHalfTurn: req.body.isHalfTurn,
                color: req.body.color
            });
            await services.save();
            res.status(201).json({ serviceList: services });
        }
    }
    catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        res.status(500).json();
    }
})

router.delete('/', validateBusinessOwnership,async (req, res) => {
    try {


        const deletedService = await Service.deleteOne({ _id: req.query.service_id });

        res.status(201).json();
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
})


module.exports = router