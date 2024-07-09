const express = require('express');
const router = express.Router();
const { Business} = require('../models/business');

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
        req.session.currentBusiness = undefined;
        res.status(201).json({})
    } catch (error) {
        console.error(error);

        return res.status(500).json();    
    }
});
module.exports = router;