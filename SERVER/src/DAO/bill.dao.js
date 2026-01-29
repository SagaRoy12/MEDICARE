import Bill from "../models/bill.model.js";

// DAO to get bills by client ID

export const getBillsByClientId_DAO = async(clientId)=>{
try{
    return await Bill.find({ clientId: clientId })
    .populate("patientID" , "firstname lastName patientPhoneNumber")  // ⚠️⚠️patient can have middle name consider it after sample testing 
    .sort({ createdAt: -1 });  // latest bill first
}catch(error){
    throw new Error(`DAO ERROR: getBillsByClientId_DAO failed | clientId=${clientId} | ${error.message}`);
}
}


//getting bills by status and clientId
export const getBillbyClinetIdandPaymentStatus_DAO = async (clientId, status) => {
  try {
    return await Bill.find({ clientId: clientId, paymentStatus: status })
      .populate("patientID", "firstName lastName patientPhoneNumeber")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(
      `DAO ERROR: getBillbyPaymentStatus_DAO failed | clientId=${clientId}, status=${status} | ${error.message}`
    );
  }
};


// get payment summary for a client 
export const getPaymentSummary_DAO = async (clientId) => {
    try{
        return await Bill.aggregate([
            {$mastch: {clientId: clientId}},
            {
                $group: {
                    _id: "$billStatus",
                    totalAmount: {$sum: "$amount"},
                    count: {$sum: 1}
                }
            }
        ]);
    }catch(error){
        throw new Error(`DAO ERROR: getPaymentSummary_DAO failed | clientId=${clientId} | ${error.message}`);
    }
}