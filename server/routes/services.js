const express = require('express');
const { Service } = require('../models/service');
const { ObjectId } = require('mongodb');
const router = express.Router()

router.get('/', async (req, res) => {
    let services = await Service.find({ business_id: new ObjectId("6688a678923aeb0740c7b48f") });

    res.status(201).json({ serviceList: services });
})

router.post('/', async (req, res) => {
    try {
        if (req.body.isEditing) {

            var services = await Service.findByIdAndUpdate(req.body._id, req.body)
            await services.save();
            res.status(201).json({ serviceList: services });
        }
        else {
            var services = new Service({
                business_id: new ObjectId("6688a678923aeb0740c7b48f"),
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
        process.exit(1);
    }
})

router.delete('/', async (req, res) => {
    // You want to serach by actual ID
    let services = await Service.deleteOne({ _id: req.body._id });
    res.status(201).json({ serviceList: services });
})


module.exports = router