import tryCatchWrapper from "../utility/tryCatchWrapper.util.js";
import { findAdminByEmail_DAO } from "../DAO/admin.dao.js";
import bcrypt from "bcrypt";
import { signedJsonWebToken } from "../utility/jwt.util.js";

// Admin login service
export const adminLoginService = tryCatchWrapper(async (email, password) => {
    // Find admin in database
    const admin = await findAdminByEmail_DAO(email);
    if (!admin) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Verifying password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Creating token with role
    const token = await signedJsonWebToken({
        id: admin._id,
        email: admin.email,
        role: 'admin'
    });

    // Return token and user data
    return {
        token,
        user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: 'admin'
        }
    };
});


// Client login service
export const clientLoginService = tryCatchWrapper(async (email, password) => {
    // Find client in database
    const client = await findClientByEmail_DAO(email);
    if (!client) {
        throw { status: 401, message: 'Invalid credentials' };
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // Create token with role
    const token = await signedJsonWebToken({
        id: client._id,
        email: client.email,
        role: 'client'
    });

    // Return token and user data
    return {
        token,
        user: {
            id: client._id,
            name: client.ownerName,
            shopName: client.shopName,
            email: client.email,
            role: 'client'
        }
    };
})