import React, { useEffect, useState } from "react";
import logo from "../Assets/dinepulse-logo.png";
import bellico from "../Assets/bell.png";
import downloadIco from "../Assets/fi-rs-sign-in.png";
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";

import { databases, DATABASE_ID, COLLECTION_ID } from "../lib/appwrite";
import { Query } from "appwrite";

import { Search, ShieldUser } from "lucide-react";
import { Link } from "react-router";

import toast from "react-hot-toast";

function CustomerList() {
  const [showAlerts, setShowAlerts] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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

  // Export CSV
  const exportDataAsCSV = async () => {
    try {
      if (!feedback.length) {
        alert("No feedback to export");
        return;
      }

      const csvRows = [];

      csvRows.push([
        "ID",
        "Name",
        "Email",
        "Feedback",
        "Comment",
        "Coupon Code",
        "Discount",
        "Created At",
      ]);

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

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>;

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
                <div
                  key={item.$id}
                  className="flex justify-between border rounded-lg p-3 items-center"
                >
                  <div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.$createdAt).toLocaleString()}
                    </div>
                    <div>{item.comment || "No comment"}</div>
                  </div>

                  <img
                    src={
                      item.feedback === "Poor"
                        ? poorIco
                        : item.feedback === "Okay"
                        ? goodIco
                        : greatIco
                    }
                    className="max-w-[50px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-screen flex flex-row bg-white items-center">
        <img src={logo} alt="logo" className="max-w-[100px] ml-10 mr-auto" />

        <div className="flex flex-col md:flex-row gap-5 md:gap-6 p-2 md:p-0 mr-10 ml-auto">
          <Link
            className="flex flex-row gap-3 border p-2 rounded-lg shadow-md cursor-pointer"
            to="/admin/dashboard"
          >
            <ShieldUser className="text-[#702517]" />
            <div className="text-[#702517] font-bold">Dashboard</div>
          </Link>

          <div
            className="flex flex-row gap-3 border p-2 rounded-lg shadow-md cursor-pointer"
            onClick={exportDataAsCSV}
          >
            <img src={downloadIco} alt="download_icon" />
            <div className="text-[#702517] font-bold">Export Data</div>
          </div>

          <div
            onClick={() => setShowAlerts(true)}
            className="flex flex-row gap-3 border p-2 rounded-lg shadow-md cursor-pointer"
          >
            <img src={bellico} alt="bell_icon" />
            <div className="text-[#702517] font-bold">View Alerts</div>
          </div>
        </div>
      </div>

      {/* Table Section */}
<div className="m-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
  {/* Search Header */}
  <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50/50 px-6 py-4">
    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#702517]/20 focus-within:border-[#702517] transition-all">
      <Search className="h-5 w-5 text-[#702517]" />
      <input
        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        placeholder="Search by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  {/* Table Container */}
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
        <tr>
          <th className="px-6 py-4">#</th>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Email</th>
          <th className="px-6 py-4 text-center">Feedback</th>
          <th className="px-6 py-4">Comment</th>
          <th className="px-6 py-4">Coupon</th>
          <th className="px-6 py-4">Discount</th>
          <th className="px-6 py-4 text-right">Created At</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100 bg-white">
        {filteredFeedback.map((item, index) => (
          <tr
            key={item.$id}
            className="group transition-colors hover:bg-gray-50/80"
          >
            <td className="px-6 py-4 font-medium text-gray-400">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-gray-600">{item.email}</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-flex items-center rounded-full bg-[#702517]/10 px-2.5 py-0.5 text-xs font-medium text-[#702517]">
                {item.feedback}
              </span>
            </td>
            <td className="max-w-xs truncate px-6 py-4 text-gray-500" title={item.comment}>
              {item.comment}
            </td>
            <td className="px-6 py-4">
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs font-bold text-gray-700">
                {item.couponcode}
              </code>
            </td>
            <td className="px-6 py-4 font-bold text-green-600">
                {item.discount}%
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-gray-400">
              {new Date(item.$createdAt).toLocaleDateString()} 
              <span className="ml-2 text-[10px] opacity-50">{new Date(item.$createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    {/* Empty State (Optional but recommended) */}
    {filteredFeedback.length === 0 && (
      <div className="py-20 text-center text-gray-500">
        No results found for "{searchTerm}"
      </div>
    )}
  </div>
</div>
    </div>
  );
}

export default CustomerList;