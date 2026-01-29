import {
    getBillsByClientId_DAO,
    getBillbyClinetIdandPaymentStatus_DAO,
    getPaymentSummary_DAO
} from "../DAO/bill.dao.js";

// making two saperate functions 1 for getting bil by clinet id and saperate function for getting bill bystatus

export const getBillByPaymentStatus_Service = async (clientId, status) => {
    try {
        return await getBillbyClinetIdandPaymentStatus_DAO(clientId, status)

    } catch (error) {
        throw new Error(`SERVICE ERROR | from getBillbyClinetIdandPaymentStatus_DAO ${clientId} | ${status} |error message => ${error.message}`)
    }
}


export const getAllBillsByClientId_Service = async (req, res) => {
    try {
        return await getBillsByClientId_DAO({ clientId: clientId })
    } catch (error) {
        throw new Error(`SERVICE ERROR | getAllBillsByClientId_Service ${clientId} | Error Message => ${error} `)
    }
}

// Get payment summary
export const getPaymentSummary_Service = async (clientId) => {
    console.log("Getting payment summary for clientId SERVICE :", clientId); // remove it later 
    try {
        const summary = await getPaymentSummary_DAO(clientId);

        // Format the summary
        const formattedSummary = {
            pending: { count: 0, totalAmount: 0 },
            paid: { count: 0, totalAmount: 0 },
            'partially paid': { count: 0, totalAmount: 0 }
        };

        summary.forEach(item => {
            formattedSummary[item._id] = {
                count: item.count,
                totalAmount: item.totalAmount
            };
        });
    } catch (error) {
        throw new Error(`SERVICE ERROR | getPaymentSummary_Service ${clientId} | Error Message => ${error} `)
    }

    return formattedSummary;
};