const express = require('express')
const router = express.Router() // Basically if you want to create a new router object to handle the get/post requests (use router.get instead of app.get)

router.get('/', (req, res) => {
    console.log("Hello world")
    res.status(201).json({message : "Hello Server"});

})

module.exports = router