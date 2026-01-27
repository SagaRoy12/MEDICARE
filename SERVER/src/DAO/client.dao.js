import ClientModel from "../models/client.model.js"

export const registerClientandSave_DAO = async (shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber) => {
    const newClient = await new ClientModel(
        {
            shopName,
            shopAddress,
            ownerPhoneNumeber,
            ownerName,
            ownerEmailID,
            ownerGSTnumber,
        }
    )
    return await newClient.save()
}
// finding client by shop name
export const getClientByShopName_DAO = async (shopName) => {
    return ClientModel.findOne({ shopName })
}


// Find client by email
export const findClientByEmail_DAO = async (email) => {
    return await ClientModel.findOne({ email });
};
