import Admin from "../models/admin.model.js"
import ClientModel from "../models/client.model.js"
// Find admin by email
export const findAdminByEmail_DAO = async (email) => {
  return await Admin.findOne({ email });
};


export const getAllClientsDAO = async () => {
  return await ClientModel.find()
}

