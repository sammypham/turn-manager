const express = require('express');
const { Sign_In } = require('../models/sign_in');
const { ObjectId } = require('mongodb');
const { Technician } = require('../models/technician');
const { Service_Record } = require('../models/service_record');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("GET SIGN IN");

        const business = req.session.currentBusiness;
        if (!business) {
            return res.status(400).json({ message: "Business ID is required" });
        }
        const businessId = req.session.currentBusiness._id;
        // Fetch the sign-ins and populate the relevant fields
        const signIns = await Sign_In.find({ business: new ObjectId(businessId) })
            .populate('business')
            .populate('technician');

        // Extract technician IDs from the sign-ins
        const technicianIds = signIns.map(signIn => signIn.technician._id);

        // Fetch the service records for these technicians
        const serviceRecords = await Service_Record.find({ technician: { $in: technicianIds } })
            .populate('technician')
            .populate('service');

        // Associate service records with sign-ins
        const signInsWithServices = signIns.map(signIn => {
            // Find the service records for the current technician
            const services = serviceRecords.filter(serviceRecord =>
                serviceRecord.technician._id.equals(signIn.technician._id)
            );

            // Add the service records to the sign-in entry
            return {
                ...signIn._doc,
                services
            };
        });

        res.status(200).json({ signIns: signInsWithServices });
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
})

router.post("/", async (req, res) => {
    try {
        const signInFound = await Sign_In.findOne({
            technician: new ObjectId(req.body.technician_id)
        })

        const technician = await Technician.findById(req.body.technician_id);

        if (!technician) {
            return res.status(404).json();
        }

        if (!signInFound) {
            const newSignIn = new Sign_In({
                technician: new ObjectId(req.body.technician_id),
                business: technician.business,
                time: new Date()
            });

            await newSignIn.save();

            res.status(201).json({ newSignIn: newSignIn });
        } else {
            const updateSignIn = await Sign_In.findOneAndUpdate({
                technician: new ObjectId(req.body.technician_id)
            }, {
                time: new Date()
            });

            res.status(201).json({ updatedSignIn: updateSignIn });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
})

router.post("/clear", async (req, res) => {
    try {
        // Step 1: Find and delete the sign-in records
        const signInsToDelete = await Sign_In.find({
            business: new ObjectId(req.query.business_id)
        });

        if (signInsToDelete.length === 0) {
            return res.status(404).json({ message: "No sign-ins found for the specified business" });
        }

        // Extract the technician IDs
        const technicianIds = signInsToDelete.map(signIn => signIn.technician);

        // Delete the sign-in records
        const deletedSignIns = await Sign_In.deleteMany({
            business: new ObjectId(req.query.business_id)
        });

        // Step 2: Delete the associated service records
        const deletedServiceRecords = await Service_Record.deleteMany({
            technician: { $in: technicianIds }
        });

        res.status(202).json({
            deletedSignIns,
            deletedServiceRecords
        });
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
})

module.exports = router;