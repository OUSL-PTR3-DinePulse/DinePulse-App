import React, { useState } from "react";
import logoImage from "../Assets/dinepulse-logo.png";
import hands from '../Assets/Clapping hands.png';
import scan from '../Assets/Group 9205.png';
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";





const Feedbackformpage = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const { coupon } = location.state || {};

  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFACC] flex flex-col gap-10 relative">

      {/* Header */}
      <div className="flex items-center justify-between px-40">
        <button 
          onClick={signOut} 
          className="flex items-center justify-center bg-white rounded-full shadow-lg px-4 py-2 text-[#702517] font-bold"
        >
          LOGOUT
        </button>

        <img src={logoImage} alt="logo" className="max-w-[150px]" />

        <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-1 text-sm none"></div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 items-center">
        <div className="text-[#702517] text-4xl font-bold text-center mb-5">Thank you for your feedback!</div>
        
        <div className="bg-white rounded-[25px] flex flex-col py-10 px-20 gap-7 items-center">
          <div className="flex items-center gap-5">
            <img src={hands} alt="hands" />
            <div className="text-[#702517] text-4xl font-bold text-center mb-5">Enjoy 10% OFF your visit!</div>
          </div>

          <div 
            
            className="bg-[#FFF4DF] flex flex-col px-20 py-10 items-center rounded-3xl border "
          >
            <div className="text-[#702517] text-5xl font-bold text-center mb-5">{coupon}</div>
            <div className="text-2xl text-gray-600">Valid until January 31,2026</div>
            <div className="mt-3 text-[#702517] font-medium">Click to view QR code</div>
          </div>

          <div className="text-[#702517] text-4xl font-medium text-center">Show this to staff</div>

          <div className="flex items-center gap-5 border p-3 rounded-2xl border-[#F2911E] cursor-pointer hover:scale-105 transition" onClick={() => setShowQRModal(true)}>
            <img src={scan} alt="scan" />
            <div className="text-[#702517] text-3xl font-medium text-center">Or scan QR code</div>
          </div>

          <div className="text-1xl text-gray-600">Cannot be combined with other offers. Valid for dine-in only.</div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-3xl flex flex-col items-center gap-5 relative">
            <button
              className="absolute top-5 right-5 text-xl font-bold text-gray-700"
              onClick={() => setShowQRModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#702517] mb-5">Your Coupon QR Code</h2>
            <QRCodeSVG value={coupon || ""} size={200} />

          </div>
        </div>
      )}

    </div>
  );
};

export default Feedbackformpage;
