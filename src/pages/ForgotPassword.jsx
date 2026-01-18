import { useState } from "react";
import { Link } from "react-router-dom";


import logoImage from "../Assets/dinepulse-logo.png";
import "../Style/input.css";
import "../Style/submit.css";
import mail from '../Assets/email.png'
import forgotico from '../Assets/Gemini_Generated_Image_9nuzt29nuzt29nuz__1_-removebg-preview 1.png'

import { sendPasswordRecovery } from "../services/auth.service";
import toast from "react-hot-toast";


function Login() {
    const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordRecovery(email);
      setMessage("Password reset link has been sent to your email.");
      toast("reset link has been sent to your email.");
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  
  return (
    <div className="flex flex-col md:flex-row min-h-screen min-w-screen justify-center bg-[#FAFACC]">
      <div className='  gap-8 min-w-[35%] flex flex-col  md:min-w-[35%] justify-center px-6 md:px-0 py-8 md:py-0'>
        <img src={logoImage} alt="logo" className='max-w-[120px]'/>
        <div className='flex flex-col mb-10'>
          <div className="text-3xl font-bold font-sans"> Forgot Your Password ?</div>
          <div className="text-sm font-bold text-gray-500">Enter your email below to retrieve your account</div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8' autoComplete="off">
        <div className='input'>
          <img src={mail} />
          <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        
        <button>
        <div className='submit'>
          Reset Password
        </div></button>
        {message && <p className="text-red-500">{message}</p>}
        </form>
        <div className='flex flex-row gap-1 font-medium text-gray-500'>
          <div>Don’t have an account? </div>
          <Link to="/signup" className='text-blue-700 underline cursor-pointer'>SignUp</Link>
        </div>
        
      </div>




      <div className='md:min-w-[35%] min-h-[300px] flex items-center justify-center px-6 md:px-0 py-8 md:py-0'>
        <div className=' flex flex-col items-center justify-center'>
          <img src={forgotico} className="w-full h-auto rounded-lg"/>
          
        </div>
      </div>




    </div>
  )
}

export default Login