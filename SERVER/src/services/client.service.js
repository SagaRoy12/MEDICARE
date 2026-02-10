import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { registerClientandSave_DAO, getClientByShopName_DAO } from "../DAO/client.dao.js"
import { getAllClients_DAO } from "../DAO/admin.dao.js";
import { bookNewTestAppointment_DAO } from "../DAO/testAppointment.dao.js"


export const registerClient_Service = async (shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID,password, ownerGSTnumber) => {

    if (await getClientByShopName_DAO(shopName)) {
        throw new Error("Client already exists")
    }
    const newClient = await registerClientandSave_DAO(shopName, shopAddress, ownerPhoneNumber, ownerName, ownerEmailID, password,ownerGSTnumber)

    return newClient
}

export const getAllClients_Service = tryCatchWrapper(async () => {
    return await getAllClients_DAO()
})


// booking new test appointment service
export const bookNewTestAppointment_Service = async (patientID, tests, testDate, testStatus, paymentID, billID) => {
    try {
        const newTestAppointment = await bookNewTestAppointment_DAO(patientID, tests, testDate, testStatus, paymentID, billID)
        return newTestAppointment
    } catch (error) {
        throw new Error(`SERVICE LAYER ERROR | bookNewTestAppointment_Service | ${error.message}`)
    }
}