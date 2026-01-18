import React, { useState } from "react";
import emailjs from "emailjs-com";
import logoImage from "../Assets/dinepulse-logo.png";
import left from "../Assets/fi-rr-angle-left.png";
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";
import { useAuth } from "../context/AuthContext";
import { databases, DATABASE_ID, COLLECTION_ID, IDHelper } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Feedbackformpage = () => {
  const [activeLang, setActiveLang] = useState("En");
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Translation object
  const translations = {
    En: {
      header1: "How was your dining experience at",
      header2: "The Golden Spoon Restaurant?",
      commentPlaceholder: "Any Comments?",
      submitBtn: "Submit Feedback",
      selectRating: "Please select a rating to continue",
      ratings: ["Poor", "Okay", "Great"]
    },
    Sin: {
      header1: "ඔබගේ ආහාර අත්දැකීම කෙසේ තිබුණේද",
      header2: "ද ගෝල්ඩන් ස්පූන් රෙස්ටුරන්ට්?",
      commentPlaceholder: "කිසිඳු අදහස් තිබේද?",
      submitBtn: "ප්‍රතිචාරය යවන්න",
      selectRating: "කරුණාකර අගය කිරීම තෝරන්න",
      ratings: ["දුර්වලයි", "හොඳයි", "අතිශය හොඳයි"]
    }
  };

  
  const ratingItems = [
    { icon: poorIco, labelIndex: 0 },
    { icon: goodIco, labelIndex: 1 },
    { icon: greatIco, labelIndex: 2 },
  ];

  // Random coupon code generator
  const generateCoupon = () => "DSP-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleSubmit = async () => {
    if (!selectedReaction) return;

    setLoading(true);
    const coupon = generateCoupon();

    try {
      
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        IDHelper.unique(),
        {
          name: user?.name || "Guest",
          email: user?.email || "No email",
          feedback: selectedReaction,
          comment,
          couponcode: coupon,
        }
      );

      // Send email using EmailJS
      await emailjs.send(
        "service_r3gslrd",
        "template_v3xaslq",
        {
          to_name: user?.name || "Guest",
          to_email: user?.email,
          coupon_code: coupon,
        },
        "faraQRcatoclTSDC-"
      );

      toast.success("Saved successfully!");
      navigate("/coupon", { state: { coupon } });
    } catch (err) {
      console.error(err);
      toast.error(activeLang === "En"
        ? "Error saving feedback or sending coupon email!"
        : "ප්‍රතිචාරය සුරැකීම හෝ කූපන් විද්‍යුත් තැපැල් යැවීමේදී දෝෂයක් සිදු විය!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFACC]">
      {/* Header */}
      <div className="flex items-center justify-between px-40">
        <button
          onClick={signOut}
          className="w-[100px] h-[40px] flex items-center justify-center bg-white rounded-full shadow-lg"
        >
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
            {translations[activeLang].header1}
          </div>

          <div className="text-[#D9B216] text-2xl font-bold text-center">
            {translations[activeLang].header2}
          </div>

          {/* Reactions */}
          <div className="flex gap-6">
            {ratingItems.map((item) => (
              <div
                key={item.labelIndex}
                onClick={() => setSelectedReaction(translations[activeLang].ratings[item.labelIndex])}
                className={`w-[15vh] h-[15vh] flex flex-col items-center justify-center rounded-2xl border-2 cursor-pointer transition ${
                  selectedReaction === translations[activeLang].ratings[item.labelIndex]
                    ? "bg-[#702517] text-white"
                    : "border-black"
                }`}
              >
                <img src={item.icon} alt={translations[activeLang].ratings[item.labelIndex]} className="w-[90px]" />
                <span className="mt-2 font-bold">
                  {translations[activeLang].ratings[item.labelIndex]}
                </span>
              </div>
            ))}
          </div>

          {/* Comment */}
          <textarea
            rows={4}
            placeholder={translations[activeLang].commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-[60vh] h-[20vh] rounded-2xl p-5 border resize-none"
          />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!selectedReaction || loading}
            className={`w-[30vh] h-[10vh] rounded-2xl font-bold transition ${
              selectedReaction
                ? "bg-gradient-to-r from-[#702517] to-[#C57C0C] text-white"
                : "bg-[#E9E1E1] text-black"
            }`}
          >
            {loading ? (activeLang === "En" ? "Saving..." : "සේව් වෙමින් පවතී...") : translations[activeLang].submitBtn}
          </button>

          <div
            className={`text-gray-600 text-1xl transition-opacity duration-300 ${
              selectedReaction ? "opacity-0" : "opacity-100"
            }`}
          >
            {translations[activeLang].selectRating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedbackformpage;
