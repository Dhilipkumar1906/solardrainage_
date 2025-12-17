import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function LidHistory() {
  const { lidId } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`https://solardrainage-backend.onrender.com/api/lids/history/${lidId}`)

      .then(res => res.json())
      .then(data => setRows(data));
  }, [lidId]);

  return (
    <div className="min-h-screen bg-[#0c0f0f] text-white pt-32 px-8">
      
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-emerald-500 rounded"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-emerald-400 mb-6">
        {lidId} – History
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10 rounded-xl">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Time</th>
              <th>Water</th>
              <th>Gas</th>
              <th>Temp</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/10 text-center">
                <td className="p-3">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td>{r.waterLevel}</td>
                <td>{r.gasLevel}</td>
                <td>{r.temperature}°C</td>
                <td
                  className={
                    r.lidStatus === "Open"
                      ? "text-red-400"
                      : "text-emerald-400"
                  }
                >
                  {r.lidStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
