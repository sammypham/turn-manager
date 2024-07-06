const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isHalf: {
        type: Boolean,
    },
    color: {
        type: String,
    }
})

const Service = mongoose.model("Service", serviceSchema);

module.exports = { Service };