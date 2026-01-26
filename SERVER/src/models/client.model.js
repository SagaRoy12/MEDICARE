import mongoose from `mongoose`

const clientDetailsModelSchema = new mongoose.Schema({

    shopName: {          // ➡️ in the user creation  need to add .toUpperCase()
        type: String,
        required: true,
        unique: true,
    },
    shopAddress: {          // ➡️ in the user creation  need to add .toUpperCase()
        type: String,
        required: true,
    },
    ownerPhoneNumeber: {
        type: Number,
        required: true,
        min: [10, `this is not a valid number`],
        max: [10, `this is not a valid number`],
        unique: true
    },
    ownerEmailID: {
        type: String,
        required: true,
    },
    ownerGSTnumber: {
        type: String,

    }


}, { timestamps: true })

const ClientModel = mongoose.model("clientDetailsModel", clientDetailsModelSchema)

export default ClientModel;