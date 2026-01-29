import {clientLogin_Service , adminLogin_Service} from '../services/login-out.services.js';
import { cookieOptions } from '../config/cookieOptions.js';

// Admin login controller
export const adminLogin_controller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer
    const { token, user } = await adminLogin_Service(email, password);
    req.user = user; // attacjh user info to request object
    res.cookie("ACCESSadmin_TOKEN",token, cookieOptions)
    // Send response
    res.json({ message: "Admin login successful", user });

  } catch (error) {
    // Handle errors from service layer
    const status = error.status || 500;
    const message = error.message || 'Server error';
    res.status(status).json({ message: message });
  }
};

export const clientLogin_controller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer
    const { token, user } = await clientLogin_Service(email, password);
    res.cookie("ACCESSclient_TOKEN",token, cookieOptions)
    // Send response
    req.user = user;
    console.log(`user in controller: ${user}`); // debugging log 
    res.json(user);

  } catch (error) {
    // Handle errors from service layer
    const status = error.status || 500;
    const message = error.message || 'Server error';
    res.status(status).json({ message });
  }
};  