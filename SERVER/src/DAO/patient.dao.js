import Patient from "../models/patient.model.js"

// Find patient by phone
export const findPatientByPhone_DAO = async (phone) => {
  return await Patient.findOne({ phone });
};