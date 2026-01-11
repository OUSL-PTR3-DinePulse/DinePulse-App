import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


import logoImage from "../Assets/dinepulse-logo.png";
import "../Style/input.css";
import "../Style/submit.css";
import pass from '../Assets/pass.png'
import mail from '../Assets/email.png'
import tablepng from '../Assets/Rectangle 14.png'


function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(form);
    navigate("/feedbackform");
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen min-w-screen justify-center bg-[#FAFACC]">
      <div className='  gap-8 min-w-[35%] flex flex-col  md:min-w-[35%] justify-center px-6 md:px-0 py-8 md:py-0'>
        <img src={logoImage} alt="logo" className='max-w-[120px]'/>
        <div className='flex flex-col'>
          <div className="text-3xl font-bold font-sans"> Welcome back</div>
          <div className="text-sm font-bold text-gray-500">Welcome back, please enter your details</div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8' autoComplete="off">
        <div className='input'>
          <img src={mail} />
          <input type="text" placeholder='Email' onChange={(e)=>setForm({...form,email:e.target.value})}/>
        </div>
        <div className='input'>
          <img src={pass} />
          <input type="password" placeholder='Password' onChange={(e)=>setForm({...form,password:e.target.value})}/>
        </div>
        <div className='w-[380px] flex text-center justify-center underline'>
          Forgot your Password?
        </div>
        <button>
        <div className='submit'>
          Log In
        </div></button>
        </form>
        <div className='flex flex-row gap-1 font-medium text-gray-500'>
          <div>Don’t have an account? </div>
          <Link to="/signup" className='text-blue-700 underline cursor-pointer'>SignUp</Link>
        </div>
      </div>




      <div className='md:min-w-[35%] min-h-[300px] flex items-center justify-center px-6 md:px-0 py-8 md:py-0'>
        <div className=' flex flex-col items-center justify-center'>
          <img src={tablepng} className="w-full h-auto rounded-lg"/>
          <div className="text-white text-center mt-[-100px] font-serif" >
             No apps to download, just simple, instant feedback right at the table. <br/>Because every opinion counts, and every diner matters.<br/> Welcome to DinePulse.
          </div>
        </div>
      </div>




    </div>
  )
}

export default Login