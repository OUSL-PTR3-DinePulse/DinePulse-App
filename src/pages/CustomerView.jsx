import React, { useState } from "react";
import logoImage from "../Assets/dinepulse-logo.png";
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";
import { Link } from "react-router";

const Feedbackformpage = () => {
  const [activeLang, setActiveLang] = useState("En");

  return (
    <div className="min-h-screen bg-[#FAFACC] flex flex-col gap-20">
      {/* Header */}
      <div className="flex items-center justify-between px-40">
        <button className="flex items-center justify-center bg-white rounded-full shadow-lg px-4 py-2 text-[#702517] font-bold">
          Admin View
        </button>

        <img src={logoImage} alt="logo" className="max-w-[150px]" />

        <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-1 text-sm">
          <span
            onClick={() => setActiveLang("En")}
            className={`px-3 py-1 rounded-full cursor-pointer ${
              activeLang === "En"
                ? "bg-[#563C23] text-white font-bold"
                : "text-gray-700"
            }`}
          >
            En
          </span>
          |
          <span
            onClick={() => setActiveLang("Sin")}
            className={`px-3 py-1 rounded-full cursor-pointer ${
              activeLang === "Sin"
                ? "bg-[#563C23] text-white font-bold"
                : "text-gray-700"
            }`}
          >
            Sin
          </span>
        </div>
      </div>



      {/* body */}
      <div className="flex flex-col gap-4 items-center">
        <div className="text-[#702517] text-4xl font-bold text-center">The Golden Spoon Restaurant</div>
        <div className="text-[#702517] text-sm  text-center">Smart Feedback System</div>
        <div className="bg-white rounded-[25px] flex flex-col items-center p-20 gap-10">
          <div className="text-[#702517] text-4xl font-bold text-center">We would love your feedback!</div>
          <div className="text-[#702517] text-sm  text-center">Your opinion help us serve you better</div>
          <Link to="/login" >
          <button
            className={`w-[30vh] h-[10vh] rounded-2xl font-bold transition bg-gradient-to-r from-[#702517] to-[#C57C0C] text-white`}>
            Give Your Feedback
          </button></Link>
          <div className="flex gap-10">
            <img src={poorIco} />
            <img src={goodIco} />
            <img src={greatIco} />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Feedbackformpage;
