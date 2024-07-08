const mongoose = require("mongoose");

const signInSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician",
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

const Sign_In = mongoose.model("sign_in", signInSchema);

module.exports = { Sign_In };