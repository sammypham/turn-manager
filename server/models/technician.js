const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pin: {
        type: String
    }
})

const Technician = mongoose.model("Technician", technicianSchema);

module.exports = { Technician };