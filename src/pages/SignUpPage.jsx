import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:"", email:"", password:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(form);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full Name" onChange={(e)=>setForm({...form,fullName:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button>Create Account</button>
    </form>
  );
}
