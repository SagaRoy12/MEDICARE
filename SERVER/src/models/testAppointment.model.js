import mongoose from `mongoose`

const testAppointmentSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    testID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },
    testDate: {
        type: Date,
        required: true
    },
    testStatus: {
        type: String,
        required: true,
        enum: [`pending`, `completed`]
    },
    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },
    billID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    },

}, { timestamps: true })

const TestAppointment = mongoose.model("testAppointment", testAppointmentSchema)

export default TestAppointment