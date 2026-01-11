import React, { useState } from 'react';
import logoImage from "../Assets/dinepulse-logo.png";
import "../Style/input.css";
import "../Style/submit.css";
import user from "../Assets/user.png";
import pass from '../Assets/pass.png';
import mail from '../Assets/email.png';
import tablepng from '../Assets/Rectangle 14.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:"", email:"", password:"" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: check if fields are empty
    if (!form.fullName || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await signUp(form);
      navigate("/feedbackform");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen min-w-screen justify-center bg-[#FAFACC]">
      <div className='gap-8 min-w-[35%] flex flex-col md:min-w-[35%] justify-center px-6 md:px-0 py-8 md:py-0'>
        <img src={logoImage} alt="logo" className='max-w-[120px]'/>
        <div className='flex flex-col'>
          <div className="text-3xl font-bold font-sans"> Create account</div>
          <div className="text-sm font-bold text-gray-500">Please enter your details</div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete="off">
          <div className='input'>
            <img src={user} />
            <input 
              type="text" 
              placeholder='Name' 
              onChange={(e)=> { setForm({...form,fullName:e.target.value}); setError(""); }} 
              autoComplete="off"
            />
          </div>

          <div className='input'>
            <img src={mail} />
            <input 
              type="text" 
              placeholder='Email' 
              onChange={(e)=> { setForm({...form,email:e.target.value}); setError(""); }} 
              autoComplete="off"
            />
          </div>

          <div className='input'>
            <img src={pass} />
            <input 
              type="password" 
              placeholder='Password' 
              onChange={(e)=> { setForm({...form,password:e.target.value}); setError(""); }} 
              autoComplete="off"
            />
          </div>

          {/* Error message */}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className='w-[380px] flex text-center justify-center underline'>
            <Link to='/forgotpassword'>Forgot your Password?</Link>
          </div>

          <button type="submit">
            <div className='submit'>Sign Up</div>
          </button>
        </form>

        <div className='flex flex-row gap-1 font-medium text-gray-500'>
          <div>Have an account?</div>
          <Link to="/login" className='text-blue-700 underline cursor-pointer'>Log In</Link>
        </div>
      </div>

      <div className='md:min-w-[35%] min-h-[300px] flex items-center justify-center px-6 md:px-0 py-8 md:py-0'>
        <div className='flex flex-col items-center justify-center'>
          <img src={tablepng} className="w-full h-auto rounded-lg"/>
          <div className="text-white text-center mt-[-100px] font-serif">
             No apps to download, just simple, instant feedback right at the table. <br/>
             Because every opinion counts, and every diner matters.<br/>
             Welcome to DinePulse.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
