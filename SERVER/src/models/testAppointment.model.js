import mongoose from "mongoose";

const testAppointmentSchema = new mongoose.Schema({

    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    // Stores multiple selected tests (ONLY names)
    tests: {
        type: [String],   // Example: ["CBC", "LFT", "ThyroidTest"]
        required: true
    },

    testDate: {
        type: Date,
        required: true
    },

    testStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },

    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },

    billID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    }

}, { timestamps: true });

const TestAppointment = mongoose.model("TestAppointment", testAppointmentSchema);

export default TestAppointment;
