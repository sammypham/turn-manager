const express = require('express');
const { Business } = require('../models/business');
const { ObjectId } = require('mongodb');
const validateLogin = require('../util/validateLogin');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        console.log(req.session.user_id)
        const businesses = await Business.find({ owner: req.session.user_id });
        console.log('ahh')
        console.log(businesses)
        res.status(201).json({ businesses: businesses });
    } catch (error) {
        console.error(error);
    }
});

router.get('/single/:business_id', async (req, res) => {
    try {
        const { business_id } = req.params;

        const business = await Business.findById(business_id);

        res.status(201).json({ business: business });
    } catch (error) {
        console.error(error);
    }
});

router.get('/currentBusiness', async (req, res) => {
    try {
        res.status(201).json({ currentBusiness: req.session.currentBusiness });
    } catch (error) {
        console.error(error);
    }
});
router.post('/', validateLogin, async (req, res) => {
    try {
        const newBusiness = new Business(
            {
                name: req.body.name,
                owner: req.session.user_id
            }
        );

        await newBusiness.save()

        res.status(201).json({ newBusiness: newBusiness });
    } catch (error) {
        console.error(error);
    }
})

router.post('/currentBusiness', async (req, res) => {
    try {
        req.session.currentBusiness = req.body.business;
        res.status(201).json({ currentBusiness: req.session.currentBusiness });
    } catch (error) {
        console.error(error);
    }
})
module.exports = router;