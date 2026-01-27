import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClientandSave_DAO, getClientByShopName_DAO, getAllClients_DAO } from "../DAO/client.dao.js"


export const registerClient_Service = tryCatchWrapper(async (shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber) => {

    if (await getClientByShopName_DAO(shopName)) {
        throw new Error("Client already exists")
    }
    const newClient = await registerClientandSave_DAO(shopName, shopAddress, ownerPhoneNumeber, ownerName, ownerEmailID, ownerGSTnumber)

    return newClient
})

export const getAllClients_Service = tryCatchWrapper(async () => {
    return await getAllClientsDAO()
})