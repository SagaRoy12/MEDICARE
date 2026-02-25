import axiosInstance from "../../utility/axiou-utility.js";

export const adminLoginFrontendApi = async (credentials) => { 
    console.log("Credentials: ", credentials); 
    try {
        const response = await axiosInstance.post("/api/admin_route/login", credentials);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}