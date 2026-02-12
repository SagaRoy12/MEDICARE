
import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({

    // Which appointment these results belong to
    appointmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestAppointment",
        required: true
    },

    // Name of the test model (CBC, LFT, ThyroidTest…)
    testType: {
        type: String,
        required: true
    },

    // Reference to the actual test result document
    // stored inside its respective test model collection
    testRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "testType" // Points to the model name in 'testType' field
    },

    // Status of the report
    reportStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }

}, { timestamps: true });

const TestResult = mongoose.model("TestResult", testResultSchema);

export default TestResult;
