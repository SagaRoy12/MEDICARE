import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClientandSave_DAO, getClientByShopName_DAO } from "../DAO/client.dao.js"
import { getAllClients_DAO } from "../DAO/admin.dao.js";

export const registerClient_Service = async (shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID, ownerGSTnumber) => {

    if (await getClientByShopName_DAO(shopName)) {
        throw new Error("Client already exists")
    }
    const newClient = await registerClientandSave_DAO(shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID, ownerGSTnumber)

    return newClient
}

export const getAllClients_Service = tryCatchWrapper(async () => {
    return await getAllClients_DAO()
})