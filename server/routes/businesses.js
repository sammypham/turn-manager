const express = require('express');
const { Business } = require('../models/business');
const { ObjectId } = require('mongodb');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find({ owner_id: new ObjectId(req.session.user_id) });

        res.status(201).json({ businesses: businesses });
    } catch (error) {
        console.error(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newBusiness = new Business(
            {
                name: req.body.name,
                owner_id: req.session.user_id
            }
        );

        await newBusiness.save()

        res.status(201).json({ newBusiness: newBusiness });
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;