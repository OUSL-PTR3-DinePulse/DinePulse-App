import React, { useState } from "react";
import logoImage from "../Assets/dinepulse-logo.png";
import left from "../Assets/fi-rr-angle-left.png";
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";

const Feedbackformpage = () => {
  const [activeLang, setActiveLang] = useState("En");
  const [selectedReaction, setSelectedReaction] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAFACC]">
      {/* Header */}
      <div className="flex items-center justify-between px-40">
        <button className="w-[100px] h-[40px] flex items-center justify-center bg-white rounded-full shadow-lg">
          <img src={left} alt="back" className="w-4 h-4" />
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

      {/* Form */}
      <div className="flex justify-center">
        <div className="bg-white w-1/2 min-h-[75vh] rounded-[25px] flex flex-col items-center justify-evenly p-6">
          <div className="text-[#702517] text-4xl font-bold text-center">
            How was your dining experience at
          </div>

          <div className="text-[#D9B216] text-2xl font-bold text-center">
            The Golden Spoon Restaurant?
          </div>

          {/* Reactions */}
          <div className="flex gap-6">
            {[
              { label: "Poor", icon: poorIco },
              { label: "Okay", icon: goodIco },
              { label: "Great", icon: greatIco },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => setSelectedReaction(item.label)}
                className={`w-[15vh] h-[15vh] flex flex-col items-center justify-center rounded-2xl border-2 cursor-pointer transition
                ${
                  selectedReaction === item.label
                    ? "bg-[#702517] text-white"
                    : "border-black"
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-[90px]" />
                <span className="mt-2 font-bold">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Comment */}
          <textarea
            rows={4}
            placeholder="Any Comments?"
            className="w-[60vh] h-[20vh] rounded-2xl p-5 border resize-none"
          />

          {/* Submit */}
          <button
            className={`w-[30vh] h-[10vh] rounded-2xl font-bold transition
            ${
              selectedReaction
                ? "bg-gradient-to-r from-[#702517] to-[#C57C0C] text-white"
                : "bg-[#E9E1E1] text-black"
            }`}
          >
            Submit Feedback
          </button>

          <div
  className={`text-gray-600 text-1xl transition-opacity duration-300 ${
    selectedReaction ? "opacity-0" : "opacity-100"
  }`}
>
  Please select a rating to continue
</div>

        </div>
      </div>
    </div>
  );
};

export default Feedbackformpage;
