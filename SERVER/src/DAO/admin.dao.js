import Admin from "../models/admin.model.js"
import ClientModel from "../models/client.model.js"
import bcrypt from "bcrypt"

// Find admin by email
export const findAdminByEmail_DAO = async (email) => {
  return await Admin.findOne({ email });
};


export const getAllClients_DAO = async () => {
  return await ClientModel.find()
}


export const compareAdminPassword_DAO = async(password, admin) => {
  return await bcrypt.compare(password, admin.password);
}
