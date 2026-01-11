
import logoImage from "../Assets/dinepulse-logo.png";

import { useAuth } from "../context/AuthContext";

const Feedbackformpage = () => {
    const { signOut } = useAuth();
  

  return (
    <div className="min-h-screen bg-[#FAFACC] flex flex-col gap-20">
      {/* Header */}
      <div className="flex items-center justify-between px-40">
       
        <button onClick={signOut} className="flex items-center justify-center bg-white rounded-full shadow-lg px-4 py-2 text-[#702517] font-bold">
          LOGOUT
        </button>

        <img src={logoImage} alt="logo" className="max-w-[150px]" />

        <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-1 text-sm none">
          
        </div>
      </div>



      {/* body */}
      <div className="flex flex-col gap-4 items-center">
        <div className="text-[#702517] text-4xl font-bold text-center mb-5">Thank you for your feedback!</div>
        <div className="bg-white rounded-[25px] flex flex-col p-20 gap-10">
          
          
          



          
        </div>
      </div>


    </div>
  );
};

export default Feedbackformpage;