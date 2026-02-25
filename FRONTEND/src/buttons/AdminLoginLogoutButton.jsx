
import React from 'react'
import { ShieldCheck } from 'lucide-react'
// import AdminLoginPage from "../pages/admin-page/AdminLoginPage"
import { useLocation } from "@tanstack/react-router"
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { adminLoginFrontendApi } from '../api-endpoints/admin-apiEndPoints/admin.Auth.frontendApi.js';

function AdminLoginLogoutButton() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // const location = useLocation();
//   const isAdminLoginPage = location.pathname === "/admin/loginRoute";
// if (!isAdminLoginPage) {
//     return null; // Don't render the button on the admin login page
//   }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    setCredentials({
      email: email,
      password: password,
    });
    console.log("Submit Handler");
    adminLoginFrontendApi(credentials)
  }


  return (
    <Link to="/admin/loginRoute">
      <button 
        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
        <ShieldCheck className="w-5 h-5" />
        Admin Login
      </button>
    </Link>
  )
}

export default AdminLoginLogoutButton
