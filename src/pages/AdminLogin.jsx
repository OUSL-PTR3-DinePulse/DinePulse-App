import React, { useState } from "react";
import logoImage from "../Assets/dinepulse-logo.png";
import { Link } from "react-router";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Navigate } from "react-router-dom";

const Feedbackformpage = () => {
  

  const { isAdmin, loginAdmin } = useAdminAuth();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    if (isAdmin) return <Navigate to="/admin/dashboard" />;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const success = loginAdmin(password);
  
      if (!success) setError("Incorrect password");
    };

  return (
    <div className="min-h-screen bg-[#FAFACC] flex flex-col gap-20">
      {/* Header */}
      <div className="flex items-center justify-between px-40">
        <Link to='/cutomerview'>
        <button className="flex items-center justify-center bg-white rounded-full shadow-lg px-4 py-2 text-[#702517] font-bold">
          Customer View
        </button></Link>

        <img src={logoImage} alt="logo" className="max-w-[150px]" />

        <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-1 text-sm none">
          
        </div>
      </div>



      {/* body */}
      <div className="flex flex-col gap-4 items-center">
        <div className="text-[#702517] text-4xl font-bold text-center">The Golden Spoon Restaurant</div>
        <div className="text-[#702517] text-sm  text-center">Smart Feedback System</div>
        <div className="bg-white rounded-[25px] flex flex-col p-20 gap-10">
          <div className="flex flex-col gap-2">
              <div className="text-[#702517] text-4xl font-bold ">Admin Access</div>
              <div className="text-[#702517] text-sm  ">Enter your credentials to access the dashboard</div>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8' >
          <div>
            <div className="text-[#702517] font-bold">Password</div>
            <input type="password" className="border border-black w-[50vh] h-[6vh] rounded-lg placeholder-[#702517] px-3" placeholder='Enter admin password' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button><div className='submit'>Log In</div></button></form>
          {error && <p className="text-red-500">{error}</p>}
          



          
        </div>
      </div>


    </div>
  );
};

export default Feedbackformpage;