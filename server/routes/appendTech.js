const express = require('express')
const router = express.Router() // Basically if you want to create a new router object to handle the get/post requests (use router.get instead of app.get)
const { Technician } = require('../models/technician');
const { ObjectId } = require('mongodb');
/*
const technicians = [
    {
        name: "Bob",
        turns: ["Manicure", "Pedicure"]
    },
    {
        name: "Alice",
        turns: ["Acrylic Nails", "Gel Nails"]
    },
    {
        name: "Charlie",
        turns: ["Pedicure", "Nail Art"]
    },
    {
        name: "Diana",
        turns: ["Manicure", "Acrylic Nails"]
    },
    {
        name: "Eve",
        turns: ["Gel Nails", "Nail Art"]
    },
    {
        name: "Frank",
        turns: ["Manicure", "Pedicure"]
    },
    {
        name: "Grace",
        turns: ["Acrylic Nails", "Gel Nails"]
    },
    {
        name: "Hank",
        turns: ["Pedicure", "Nail Art"]
    },
    {
        name: "Ivy",
        turns: ["Manicure", "Nail Art"]
    },
    {
        name: "Jack",
        turns: ["Gel Nails", "Manicure"]
    },
    {
        name: "Karen",
        turns: ["Acrylic Nails", "Pedicure"]
    },
    {
        name: "Leo",
        turns: ["Gel Nails", "Nail Art"]
    },
    {
        name: "Mia",
        turns: ["Manicure", "Acrylic Nails"]
    },
    {
        name: "Nina",
        turns: ["Pedicure", "Gel Nails"]
    },
    {
        name: "Oscars",
        turns: ["Manicure", "Nail Art"]
    },
];

*/
router.get('/', async(req, res) => {

    let technicians= await Technician.find({business_id: new ObjectId("6688a678923aeb0740c7b48f") });

    res.status(201).json({techList : technicians});
});

router.post('/', async(req, res) => {
    
    try {
        if (req.body.isEditing) {
  
            var technician = await Technician.findByIdAndUpdate(req.body._id,req.body)
            await technician.save();
            res.status(201).json({ techList: technician });
        }
        else {
            // worry about confirmPin later
            var technician = new Technician({
                business_id: new ObjectId("6688a678923aeb0740c7b48f"),
                name: req.body.name,
                pin: req.body.pin,
            });
            await technician.save();
            res.status(201).json({ techList: technician });
        }
    }
    catch(error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1);
    }

})

router.delete('/', async(req, res) => {
    // You want to serach by actual ID
    console.log(req.body)
    let technician= await Technician.deleteOne({ _id: req.body._id});
    console.log(technician)
    res.status(201).json({ techList: technician});
})


module.exports = router