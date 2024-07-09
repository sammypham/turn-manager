const express = require('express');
const router = express.Router();
const { Business} = require('../models/business');
const { Technician} = require('../models/technician');
const { Service} = require('../models/service');
const { Sign_In} = require('../models/sign_in');
const { Service_Record} = require('../models/service_record');

router.post('/', async (req, res) => {
    try {
        await Business.findByIdAndUpdate(
            req.session.currentBusiness._id,
            {
                name: req.body.name
            }
        )

        res.status(201).json({ businessId: req.session.currentBusiness._id });
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
});

router.delete('/', async (req, res) => {
    try {
        await Business.findByIdAndDelete(req.session.currentBusiness._id)
        await Service.deleteMany({business : req.session.currentBusiness._id})
        await Sign_In.deleteMany({business : req.session.currentBusiness._id})

        const techList = await Technician.find({business : req.session.currentBusiness._id})
        console.log(techList)
        techList.forEach(async(givenTech, index) => {
            await Service_Record.deleteMany({technician: givenTech._id})
        });
        await Technician.deleteMany({business : req.session.currentBusiness._id})
        req.session.currentBusiness = undefined;
        res.status(201).json({})
    } catch (error) {
        console.error(error);

        return res.status(500).json();    
    }
});
module.exports = router;