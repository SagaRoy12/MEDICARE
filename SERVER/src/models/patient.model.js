import mongoose from `mongoose`

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    patientPhoneNumeber: {
        type: Number,
        required: true,
        min: [10, `this is not a valid number`],
        max: [10, `this is not a valid number`],
        unique: true
    }

    // add all the services he opted till now in an array format 
}, { timestamps: true })

const Patient = mongoose.model("Patient", patientSchema)

export default Patient
