import React, { useEffect, useState } from "react";
import logo from "../Assets/dinepulse-logo.png";
import bellico from "../Assets/bell.png";
import downloadIco from "../Assets/fi-rs-sign-in.png";
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";

import { databases, DATABASE_ID, COLLECTION_ID } from "../lib/appwrite";
import { Query } from "appwrite";

// Added ChevronRight here
import { Search, ShieldUser, ChevronRight } from "lucide-react";
import { Link } from "react-router";

import toast from "react-hot-toast";

function CustomerList() {
  const [showAlerts, setShowAlerts] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [expandedRows, setExpandedRows] = useState([]);
  const [allExpanded, setAllExpanded] = useState(false);

  // Fetch ALL feedback from Appwrite
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        let allDocs = [];
        let offset = 0;
        const limit = 100;

        while (true) {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc("$createdAt"), Query.limit(limit), Query.offset(offset)]
          );

          allDocs = [...allDocs, ...response.documents];

          if (response.documents.length < limit) break;

          offset += limit;
        }

        setFeedback(allDocs);
        setRecentFeedback(allDocs);
      } catch (error) {
        console.error("Error loading feedback:", error);
        toast.error("Error loading feedback");
      }

      setLoading(false);
    };

    fetchFeedback();
  }, []);

  // Search filter
  const filteredFeedback = recentFeedback.filter((item) =>
    item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Grouping logic
  const groupedData = filteredFeedback.reduce((acc, item) => {
    const email = item.email || "unknown";
    if (!acc[email]) acc[email] = [];
    acc[email].push(item);
    return acc;
  }, {});

  // Export CSV
  const exportDataAsCSV = async () => {
    try {
      if (!feedback.length) {
        toast.error("No feedback to export");
        return;
      }

      const csvRows = [
        ["ID", "Name", "Email", "Feedback", "Comment", "Coupon Code", "Discount", "Created At"]
      ];

      feedback.forEach((doc) => {
        csvRows.push([
          doc.$id,
          doc.name || "",
          doc.email || "",
          doc.feedback || "",
          doc.comment || "",
          doc.couponcode || "",
          doc.discount || "",
          doc.$createdAt,
        ]);
      });

      const csvString = csvRows
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\n");

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

  const toggleRow = (email) => {
    setExpandedRows(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFACC]">
        <div className="text-xl font-bold text-[#702517] animate-pulse">Loading Feedback...</div>
      </div>
    );

  return (
    <div className="bg-[#FAFACC] min-h-screen">
      {/* Alerts Modal */}
      {showAlerts && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-2xl"
              onClick={() => setShowAlerts(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-5 text-gray-800">Recent Feedbacks</h2>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
              {feedback.slice(0, 10).map((item) => (
                <div
                  key={item.$id}
                  className="flex justify-between border border-gray-100 rounded-xl p-4 items-center bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 font-medium mb-1">
                      {new Date(item.$createdAt).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {item.comment || <span className="italic text-gray-300">No comment</span>}
                    </div>
                  </div>

                  <img
                    src={
                      item.feedback === "Poor" ? poorIco : item.feedback === "Okay" ? goodIco : greatIco
                    }
                    alt={item.feedback}
                    className="w-10 h-10 object-contain ml-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full flex flex-row bg-white items-center py-2 px-6 md:px-10 shadow-sm sticky top-0 z-40">
        <img src={logo} alt="logo" className="w-24 md:w-28" />

        <div className="flex gap-3 ml-auto">
          <Link
            className="flex items-center gap-2 border border-gray-100 p-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-[#702517] font-bold text-sm"
            to="/admin/dashboard"
          >
            <ShieldUser size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          <button
            className="flex items-center gap-2 border border-gray-100 p-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-[#702517] font-bold text-sm"
            onClick={exportDataAsCSV}
          >
            <img src={downloadIco} alt="export" className="w-4 h-4" />
            <span className="hidden md:inline">Export</span>
          </button>

          <button
            onClick={() => setShowAlerts(true)}
            className="flex items-center gap-2 border border-gray-100 p-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-[#702517] font-bold text-sm"
          >
            <img src={bellico} alt="alerts" className="w-4 h-4" />
            <span className="hidden md:inline">Alerts</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="m-4 md:m-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/50 px-6 py-5">
          <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#702517]/20 focus-within:border-[#702517] transition-all">
            <Search className="h-4 w-4 text-[#702517]" />
            <input
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setAllExpanded(!allExpanded)}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#702517] hover:opacity-70 transition-opacity bg-[#702517]/5 px-4 py-2 rounded-full"
          >
            {allExpanded ? "Collapse All" : "Expand All Groups"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">User / Email</th>
                <th className="px-6 py-4">Latest Feedback</th>
                <th className="px-6 py-4">Entries</th>
                <th className="px-6 py-4">Latest Coupon</th>
                <th className="px-6 py-4 text-right">Last Activity</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 bg-white">
              {Object.values(groupedData).map((group) => {
                const mainItem = group[0];
                const isExpanded = expandedRows.includes(mainItem.email) || allExpanded;

                return (
                  <React.Fragment key={mainItem.$id}>
                    {/* Group Header Row */}
                    <tr
                      onClick={() => toggleRow(mainItem.email)}
                      className="cursor-pointer transition-colors hover:bg-gray-50/50 group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90' : ''}`}>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-[#702517]" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 leading-none mb-1">{mainItem.name || "Anonymous"}</p>
                            <p className="text-xs text-gray-400 font-medium">{mainItem.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          mainItem.feedback === "Great" ? "bg-green-100 text-green-700" : 
                          mainItem.feedback === "Poor" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {mainItem.feedback}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                          {group.length}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <code className="font-mono text-[11px] font-black text-gray-600 tracking-tighter">
                          {mainItem.couponcode || "---"}
                        </code>
                      </td>
                      <td className="px-6 py-5 text-right text-xs font-semibold text-gray-400">
                        {new Date(mainItem.$createdAt).toLocaleDateString()}
                      </td>
                    </tr>

                    {/* Collapsible Details */}
                    {isExpanded && group.map((subItem, subIdx) => (
                      <tr key={subItem.$id} className="bg-gray-50/30 text-[13px] border-l-[3px] border-l-[#702517]/20">
                        <td className="px-16 py-4">
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                            Entry #{group.length - subIdx}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 font-medium">{subItem.feedback}</td>
                        <td className="px-6 py-4 text-gray-400 italic max-w-xs truncate" title={subItem.comment}>
                          {subItem.comment || "No comment"}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-black">{subItem.discount}% OFF</td>
                        <td className="px-6 py-4 text-right text-[11px] text-gray-300 font-bold">
                          {new Date(subItem.$createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          
          {filteredFeedback.length === 0 && (
            <div className="py-20 text-center">
               <p className="text-gray-400 font-medium italic">No matching results found...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerList;