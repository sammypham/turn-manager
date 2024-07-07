const mongoose = require("mongoose");

const serviceRecordSchema = mongoose.Schema({
    technician: {
        type: mongoose.Types.ObjectId,
        ref: "Technician",
        required: true
    },
    service: {
        type: mongoose.Types.ObjectId,
        ref: "Service",
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

const Service_Record = mongoose.model("Service_Record", serviceRecordSchema);

module.exports = { Service_Record };