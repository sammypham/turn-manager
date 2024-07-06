const express = require('express');
const { Service } = require('../models/service');
const router = express.Router()

const services = [
    { name: "Manicure", abbreviation: "M", isHalfTurn: false, color: "#FF5733" },        // Red-orange
    { name: "Pedicure", abbreviation: "P", isHalfTurn: false, color: "#33FF57" },        // Green
    { name: "Acrylic Nails", abbreviation: "AN", isHalfTurn: false, color: "#3357FF" },  // Blue
    { name: "Gel Nails", abbreviation: "GN", isHalfTurn: false, color: "#FF33A1" },      // Pink
    { name: "Nail Art", abbreviation: "NA", isHalfTurn: false, color: "#A133FF" },       // Purple
    { name: "Polish Change", abbreviation: "PC", isHalfTurn: true, color: "#FF5733" },   // Red-orange
    { name: "Toe-Nails Cut", abbreviation: "TNC", isHalfTurn: true, color: "#33FFA1" },  // Light green
    { name: "French Manicure", abbreviation: "FM", isHalfTurn: false, color: "#FFA133" },// Orange
    { name: "Shellac Manicure", abbreviation: "SM", isHalfTurn: false, color: "#33A1FF" },// Light blue
    { name: "Paraffin Wax Treatment", abbreviation: "PWT", isHalfTurn: true, color: "#FF5733" }, // Red-orange
    { name: "Hand Massage", abbreviation: "HM", isHalfTurn: true, color: "#FF33FF" },    // Magenta
    { name: "Foot Massage", abbreviation: "FM", isHalfTurn: true, color: "#FF33D4" },    // Deep pink
    { name: "Nail Repair", abbreviation: "NR", isHalfTurn: true, color: "#33FFF4" },     // Aqua
    { name: "Cuticle Care", abbreviation: "CC", isHalfTurn: true, color: "#FF33F4" },    // Pink
    { name: "Callus Removal", abbreviation: "CR", isHalfTurn: false, color: "#A1FF33" }, // Lime green
    { name: "Nail Extensions", abbreviation: "NE", isHalfTurn: false, color: "#FF5733" },// Red-orange
    { name: "Dip Powder Nails", abbreviation: "DPN", isHalfTurn: false, color: "#5733FF" },// Indigo
    { name: "Ombre Nails", abbreviation: "ON", isHalfTurn: false, color: "#33A1FF" },    // Light blue
    { name: "Nail Shaping", abbreviation: "NS", isHalfTurn: true, color: "#FF33A1" }     // Pink
];

router.get('/', (req, res) => {
    res.status(201).json({ serviceList: services });
})

router.post('/', (req, res) => {
    var newService = req.body;
    newService["name"] = req.body.name
    newService["abbreviation"] = newService["name"].substring(0, 4)
    newService["color"] = req.body.color;
    newService["isHalfTurn"] = req.body.isHalfTurn;

    services.push(newService);

    res.status(201).json({ serviceList: services });
})

module.exports = router