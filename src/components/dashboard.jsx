import React from "react";
import home from "../App.jsx"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">
          Donation Transparency Dashboard
        </h1>
        <button
          onClick={() => setPage("home")}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Donated", value: "₹10,000" },
          { title: "Utilized", value: "₹6,000" },
          { title: "Remaining", value: "₹4,000" },
          { title: "Beneficiaries", value: "120 Families" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition"
          >
            <h2 className="text-sm text-gray-300">{item.title}</h2>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        
        {/* Fund Progress */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
          <h2 className="text-xl font-semibold mb-4">Fund Utilization</h2>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Food Supplies</span>
              <span>40%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full w-[40%]"></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Medical Aid</span>
              <span>20%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full w-[20%]"></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Shelter</span>
              <span>30%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full w-[30%]"></div>
            </div>
          </div>
        </div>

        {/* Circular Chart */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 flex items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
            <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">60% Used</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
        <h2 className="text-xl font-semibold mb-4">Transaction Log</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-300 border-b border-gray-600">
              <tr>
                <th className="py-3">Date</th>
                <th>Action</th>
                <th>Amount</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-white/5">
                <td className="py-3">13 Feb 2026</td>
                <td>Purchased Rice Bags</td>
                <td>₹2,000</td>
                <td>Relief Admin</td>
              </tr>
              <tr className="border-b border-gray-700 hover:bg-white/5">
                <td className="py-3">14 Feb 2026</td>
                <td>Medical Kit Supply</td>
                <td>₹1,000</td>
                <td>NGO Partner</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3">15 Feb 2026</td>
                <td>Temporary Shelter Setup</td>
                <td>₹3,000</td>
                <td>Field Officer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}