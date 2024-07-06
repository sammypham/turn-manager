const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Business = mongoose.model("Business", businessSchema)

module.exports = { Business };