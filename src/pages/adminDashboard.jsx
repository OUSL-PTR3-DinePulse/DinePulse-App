import React, { useEffect, useState } from "react";
import logo from '../Assets/dinepulse-logo.png';
import bellico from '../Assets/bell.png';
import downloadIco from '../Assets/fi-rs-sign-in.png';
import user3d from '../Assets/User_perspective_matte.png';
import calender3d from '../Assets/Calendar_perspective_matte.png';
import graph3d from '../Assets/Chart_perspective_matte.png';
import gift3d from '../Assets/Gift_perspective_matte.png';
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";
import infoico from '../Assets/fi-rr-info.png';
import { useAdminAuth } from "../context/AdminAuthContext";
import { databases, DATABASE_ID, COLLECTION_ID } from "../lib/appwrite";
import { Query } from "appwrite";
import { Users } from 'lucide-react';
import { Link } from "react-router";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { logoutAdmin } = useAdminAuth();
  const [showAlerts, setShowAlerts] = useState(false);

  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const [poorCount, setPoorCount] = useState(0);
  const [okayCount, setOkayCount] = useState(0);
  const [greatCount, setGreatCount] = useState(0);

  const [recentFeedback, setRecentFeedback] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);

  // Fetch Feedback From Appwrite 
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.orderDesc("$createdAt")
        ]);

        setFeedback(response.documents);

        // Count each type
        const poor = response.documents.filter(f => f.feedback === "Poor").length;
        const okay = response.documents.filter(f => f.feedback === "Okay").length;
        const great = response.documents.filter(f => f.feedback === "Great").length;

        setPoorCount(poor);
        setOkayCount(okay);
        setGreatCount(great);

        // Last 3 items
        setRecentFeedback(response.documents.slice(0, 3));

        // Today’s feedback
        const today = new Date().toISOString().split("T")[0]; 
        const todayFeedback = response.documents.filter(doc => doc.$createdAt.startsWith(today));
        setTodayTotal(todayFeedback.length);

      } catch (error) {
        console.error("Error loading feedback:", error);
        toast.error("Error loading feedback");
      }

      setLoading(false);
    };

    fetchFeedback();
  }, []);
  

  const total = poorCount + okayCount + greatCount || 1;
  const poorpercent = Math.floor((poorCount / total) * 100);
  const okaypercent = Math.floor((okayCount / total) * 100);
  const greatpercent = Math.floor((greatCount / total) * 100);
  const satisfactionRate = Math.floor(((greatCount + okayCount) / total) * 100);

  //  Export CSV Function const exportDataAsCSV
  const exportDataAsCSV = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

      if (!response.documents.length) {
        alert("No feedback to export");
        return;
      }

      const csvRows = [];
      csvRows.push(["ID", "Feedback", "Comment","Coupon Code", "Discount" ,"Created At"]);

      response.documents.forEach(doc => {
        csvRows.push([
          doc.$id,
          doc.feedback || "",
          doc.comment || "",
          doc.couponcode || "",
          doc.discount || "",
          doc.$createdAt
        ]);
      });

      const csvString = csvRows.map(row => row.map(item => `"${item}"`).join(",")).join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `feedback_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded!");

    } catch (err) {
      console.error("Error exporting data:", err);
      toast.error("Failed to export data");
    }
  };

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;

  //  Weekly Trends Data 
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      days.push(`${year}-${month}-${day}`);
    }
    return days;
  };

  const weeklyData = getLast7Days().map(day => {
    const dailyFeedback = feedback.filter(f => f.$createdAt.startsWith(day));
    return {
      date: day.split("-").slice(1).join("/"), 
      Poor: dailyFeedback.filter(f => f.feedback === "Poor").length,
      Okay: dailyFeedback.filter(f => f.feedback === "Okay").length,
      Great: dailyFeedback.filter(f => f.feedback === "Great").length,
    };
  });

  return (
    <div className="bg-[#FAFACC] min-h-screen md:min-w-[35%]">

      {/* Alerts Modal */}
      {showAlerts && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[90%] max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 font-bold text-xl"
              onClick={() => setShowAlerts(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-5">Recent Feedbacks</h2>
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {feedback.slice(0, 10).map((item) => (
                <div key={item.$id} className="flex justify-between border rounded-lg p-3 items-center">
                  <div>
                    <div className='text-sm text-gray-500'>
                      {new Date(item.$createdAt).toLocaleString()}
                    </div>
                    <div>{item.comment || "No comment"}</div>
                  </div>
                  <img
                    src={item.feedback === "Poor" ? poorIco : item.feedback === "Okay" ? goodIco : greatIco}
                    className='max-w-[50px]'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*  Header */}
      <div className="w-screen flex flex-row bg-white items-center">
        <img src={logo} alt="logo" className="max-w-[100px] ml-10 mr-auto"/>
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 p-2 md:p-0 mr-10 ml-auto">
          <Link className='flex flex-row gap-3 border p-2 rounded-lg shadow-md cursor-pointer' to="/customerlist">
            <Users className="text-[#702517]"/>
            <div className='text-[#702517] font-bold'>Customer List </div>
          </Link>
          <div className='flex flex-row gap-3 border p-2 rounded-lg shadow-md cursor-pointer' onClick={exportDataAsCSV}>
            <img src={downloadIco} alt="download_icon"/>
            <div className='text-[#702517] font-bold'>Export Data</div>
          </div>

          <div onClick={() => setShowAlerts(true)} className='flex flex-row gap-3 border p-2 rounded-lg shadow-md cursor-pointer'>
            <img src={bellico} alt="bell_icon"/>
            <div className='text-[#702517] font-bold'>View Alerts</div>
          </div>

          <div className='flex flex-row gap-3 border px-8 py-2 rounded-lg shadow-md items-center bg-[#702517] cursor-pointer' onClick={logoutAdmin}>
            <div className='text-white font-bold uppercase'>Logout</div>
          </div>
        </div>
      </div>

      {/* Stats Cards  */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center mt-10">
        {[ 
          {title: "Total Feedback", value: total, icon: user3d},
          {title: "Today’s Feedback", value: todayTotal, icon: calender3d},
          {title: "Satisfaction Rate", value: satisfactionRate + "%", icon: graph3d},
          {title: "Coupons", value: total, icon: gift3d}
        ].map((card, i) => (
          <div key={i} className="flex items-center bg-white gap-5 p-10 w-[15%] rounded-2xl mr-auto ml-auto">
            <div className="flex flex-col">
              <div className='text-gray-500 font-bold'>{card.title}</div>
              <div className='text-[#702517] font-bold text-3xl'>{card.value}</div>
            </div>
            <img src={card.icon} alt={card.title}/>
          </div>
        ))}
      </div>

      {/* Feedback Distribution & Alerts */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mt-10 justify-center font-bold text-[#702517]">
        {/* Feedback Distribution */}
        <div className="flex flex-col bg-white gap-5 p-10 rounded-3xl min-w-[60%]">
          <div>Feedback Distribution</div>
          {[
            {label: "Unhappy", percent: poorpercent, color: "bg-red-500", icon: poorIco},
            {label: "Neutral", percent: okaypercent, color: "bg-yellow-500", icon: goodIco},
            {label: "Happy", percent: greatpercent, color: "bg-green-500", icon: greatIco}
          ].map((f, idx) => (
            <div key={idx} className='flex items-center w-[100%] gap-10'>
              <img src={f.icon}/>
              <div className='flex flex-col gap-3 bg-white w-[80%]'>
                <div className='flex'>
                  <div className='ml-0 mr-auto'>{f.label}</div>
                  <div>{f.percent}%</div>
                </div>
                <div className='w-full'>
                  <div className='bg-gray-500 w-[100%] h-5 rounded-xl'/>
                  <div className={`${f.color} mt-[-20px] h-5 rounded-xl`} style={{ width: `${f.percent}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Alerts */}
        <div className='flex flex-col gap-5 bg-white w-[100%] md:w-[25%] p-10 rounded-3xl'>
          <div className="flex gap-3">
            <img src={infoico} className='max-h-7' />
            <div>Active Alerts</div>
          </div>
          <div className="flex flex-col gap-5">
            {feedback.some(f => f.feedback === "Poor") && (
              <div className="border border-red-500 bg-red-200 rounded-xl p-5">
                <div>Negative feedback received</div>
                <div className='text-base font-light'>
                  {feedback.filter(f => f.feedback === "Poor").length} recent
                </div>
              </div>
            )}

            {(() => {
              const totalFeedback = feedback.length || 1;
              const poorCount = feedback.filter(f => f.feedback === "Poor").length;
              const okayCount = feedback.filter(f => f.feedback === "Okay").length;
              const satisfactionRate = Math.floor(((okayCount + (totalFeedback - poorCount - okayCount)) / totalFeedback) * 100);

              if (satisfactionRate < 50) {
                return (
                  <div className="border border-yellow-500 bg-[#EDD6B2] rounded-xl p-5">
                    <div>Low satisfaction today</div>
                    <div className='text-base font-light'>{satisfactionRate}% satisfied</div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>

      {/* Weekly Trends & Recent Feedback */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mt-10 justify-center font-bold text-[#702517]">
        {/* Weekly Trends Bar Chart */}
        <div className="flex flex-col bg-white gap-5 p-10 rounded-3xl min-w-[60%]">
          <div className="text-xl font-bold">Weekly Trends</div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Poor" fill="#f87171" />
                <Bar dataKey="Okay" fill="#facc15" />
                <Bar dataKey="Great" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className='flex flex-col gap-5 bg-white w-[100%] md:w-[25%] p-10 rounded-3xl'>
          <div className="flex gap-3">Recent Feedback</div>
          <div className="flex flex-col gap-5">
            {recentFeedback.map((item) => (
              <div key={item.$id} className="flex border rounded-xl p-5 items-center">
                <div>
                  <div className='text-base font-light'>
                    {new Date(item.$createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div>{item.comment || "No comment"}</div>
                  <div>{item.discount || "error"}</div>
                </div>

                <img
                  src={item.feedback === "Poor" ? poorIco : item.feedback === "Okay" ? goodIco : greatIco}
                  className='max-w-[70px] mr-0 ml-auto'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
