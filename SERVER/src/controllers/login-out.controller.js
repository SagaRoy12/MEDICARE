import {clientLogin_Service , adminLogin_Service} from '../services/login-out.services.js';


// Admin login controller
export const adminLogin_controller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer
    const result = await adminLogin_Service(email, password);
    
    // Send response
    res.json(result);
  } catch (error) {
    // Handle errors from service layer
    const status = error.status || 500;
    const message = error.message || 'Server error';
    res.status(status).json({ message });
  }
};

export const clientLogin_controller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call service layer
    const result = await clientLogin_Service(email, password);
    
    // Send response
    res.json(result);
  } catch (error) {
    // Handle errors from service layer
    const status = error.status || 500;
    const message = error.message || 'Server error';
    res.status(status).json({ message });
  }
};  