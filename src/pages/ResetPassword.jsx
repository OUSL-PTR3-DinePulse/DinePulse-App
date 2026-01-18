import { useState } from "react";
import { Link } from "react-router-dom";


import logoImage from "../Assets/dinepulse-logo.png";
import "../Style/input.css";
import "../Style/submit.css";
import pass from '../Assets/pass.png'
import forgotico from '../Assets/Gemini_Generated_Image_9nuzt29nuzt29nuz__1_-removebg-preview 1.png'

import { useSearchParams, useNavigate } from "react-router-dom";
import { completePasswordReset } from "../services/auth.service";
import toast from "react-hot-toast";


function Login() {
  const [params] = useSearchParams();
    const navigate = useNavigate();
  
    const userId = params.get("userId");
    const secret = params.get("secret");
  
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await completePasswordReset(userId, secret, password);
        toast.success("Password updated successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        toast.error("Error resetting password");
        console.error(err);
      }
    };
  return (
    <div className="flex flex-col md:flex-row min-h-screen min-w-screen justify-center bg-[#FAFACC]">
      <div className='  gap-8 min-w-[35%] flex flex-col  md:min-w-[35%] justify-center px-6 md:px-0 py-8 md:py-0'>
        <img src={logoImage} alt="logo" className='max-w-[120px]'/>
        <div className='flex flex-col'>
          <div className="text-3xl font-bold font-sans"> Reset Password</div>
          <div className="text-sm font-bold text-gray-500">please enter your new password</div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8' autoComplete="off">
        <div className='input'>
          <img src={pass} />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button>
        <div className='submit'>
          Log In
        </div></button>
        </form>
        
      </div>




      <div className='md:min-w-[35%] min-h-[300px] flex items-center justify-center px-6 md:px-0 py-8 md:py-0 md:flex-none'>
        <div className=' flex flex-col items-center justify-center'>
          <img src={forgotico} className="w-full h-auto rounded-lg"/>
          
        </div>
      </div>




    </div>
  )
}

export default Login