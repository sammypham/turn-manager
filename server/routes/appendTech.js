const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log("Hello world")
    res.status(201).json({ message: "Hello Server" });
})


module.exports = router