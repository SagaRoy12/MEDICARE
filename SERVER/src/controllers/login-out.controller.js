import { clientLogin_Service, adminLogin_Service } from '../services/login-out.services.js';
import { cookieOptions } from '../config/cookieOptions.js';

// Admin login controller
export const adminLogin_controller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer
    const { token, user } = await adminLogin_Service(email, password);
    req.user = user; // attacjh user info to request object
    res.cookie("ACCESSadmin_TOKEN", token, cookieOptions)
    // Send response
    res.json({ message: "Admin login successful", user });

  } catch (error) {
    console.error(`CONTROLLER ERROR | login-logout |adminLogin_controller ${error}`)
    res.status(500).json({
      message: message,
      controller: "adminLogin_controller",
      error: error.toString()
    })
  }
};

// admin logout controller
export const adminLogout_controller = (req, res) => {
  try {
    res.clearCookie("ACCESSadmin_TOKEN", cookieOptions);
    res.json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error(`CONTROLLER ERROR | login-logout |adminLogout_controller ${error}`)
    res.status(500).json({
      message: "Logout failed",
      controller: "adminLogout_controller",
      error: error.toString()
    })
  }
}

// client login controller
export const clientLogin_controller = async (req, res) => {
  const { ownerEmailID, password } = req.body;

  try {
    // Call service layer
    const { token, user } = await clientLogin_Service(ownerEmailID, password);
    
      res.cookie("ACCESSclient_TOKEN", token, cookieOptions)
    // Send response
    req.user = user;
    // console.log(`user in controller: ${user}`); // debugging log 
    res.json({  message: "Client login successful", user });

  } catch (error) {
    console.error(`CONTROLLER ERROR | login-logout |clientLogin_controller ${error}`)
    res.status(500).json({
      message: error.message,
      controller: "clientLogin_controller",
      error: error.toString()
    })
  }
}; 

//client logout controller
export const clientLogout_controller = (req, res) => {
  try {
    res.clearCookie("ACCESSclient_TOKEN", cookieOptions);
    res.json({ message: "Client logged out successfully" });
  } catch (error) {
    console.error(`CONTROLLER ERROR | login-logout |clientLogout_controller ${error}`)
    res.status(500).json({
      message: "Logout failed",
      controller: "clientLogout_controller",
      error: error.toString()
    })
  }
}