import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef, useEffect, useState } from "react";

export default function Report() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedLid, setSelectedLid] = useState("lid1");
  const reportRef = useRef();

  const channels = {
    lid1: {
      id: 3209958,
      api: "TNAGAR_LID_1",
    },
    lid2: {
      id: 3205130,
      api: "TNAGAR_LID_2",
    },
    lid3: {
      id: 3205159,
      api: "TNAGAR_LID_3",
    },
  };

  const charts = [
    { title: "Water Level", field: 1, color: "00E5FF" },
    { title: "Gas Level", field: 2, color: "FF9800" },
    { title: "Temperature", field: 3, color: "4CAF50" },
    { title: "Lid Status", field: 4, color: "F44336" },
  ];

  useEffect(() => {
    fetchReport(selectedLid);
  }, [selectedLid]);

  async function fetchReport(lid = selectedLid) {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/lids/latest/${channels[lid].api}`
      );
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Failed to fetch report:", err);
    } finally {
      setLoading(false);
    }
  }

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Inspection_Report_${report?.lidId || "Report"}.pdf`);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Safe":
        return "text-emerald-400";
      case "Monitor":
        return "text-yellow-400";
      case "Warning":
        return "text-orange-400";
      case "Critical":
        return "text-red-500";
      default:
        return "text-gray-300";
    }
  };

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white text-2xl font-semibold tracking-wide">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          Loading Report...
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-red-400 text-2xl font-semibold tracking-wide">
        Unable to load report.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0B1120] text-white py-12 px-6 selection:bg-cyan-500/30">
      <div ref={reportRef} className="max-w-7xl mx-auto space-y-10 bg-[#0B1120] p-4 rounded-xl">
        
        <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 rounded-[2rem] border border-cyan-500/30 shadow-[0_0_40px_-15px_rgba(6,182,212,0.3)] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 relative z-10">
            <div className="space-y-4">
              <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-inner">
                AI Powered Smart Drainage Monitoring System
              </span>
              <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                AI Inspection Report
              </h1>
              <p className="text-slate-400 text-lg font-medium">
                Edge AI Solar Powered Smart Drainage Monitoring System
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Report Generated</p>
                <h3 className="text-xl font-bold text-cyan-400">
                  {new Date().toLocaleString()}
                </h3>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-colors">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Manhole ID</p>
                <h3 className="text-xl font-bold text-orange-400">
                  {report.lidId}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center px-2">
          <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <span className="text-slate-400 font-medium pl-3 text-sm uppercase tracking-wider">Select Node:</span>
            <div className="relative inline-block w-48">
              <select
                value={selectedLid}
                onChange={(e) => setSelectedLid(e.target.value)}
                className="block w-full appearance-none bg-slate-800/80 border border-cyan-500/40 text-cyan-300 font-bold py-3 px-5 pr-10 rounded-xl shadow-lg hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer"
              >
                <option value="lid1">Lid 1 - TNAGAR</option>
                <option value="lid2">Lid 2 - TNAGAR</option>
                <option value="lid3">Lid 3 - TNAGAR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-400">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-2 bg-cyan-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-100">
              Live Sensor Summary
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-slate-900 to-[#0c1222] rounded-3xl border border-cyan-500/20 p-8 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)] hover:-translate-y-2 transition-all duration-300 ease-out relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:bg-cyan-500/10"></div>
              <div className="text-5xl mb-6 relative z-10 drop-shadow-md">💧</div>
              <p className="text-slate-400 font-medium tracking-wide mb-1">Water Level</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl font-black text-cyan-400 tracking-tight">{report.waterLevel}</h3>
                <span className="text-cyan-400/60 font-semibold text-lg">cm</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-slate-900 to-[#0c1222] rounded-3xl border border-orange-500/20 p-8 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] hover:-translate-y-2 transition-all duration-300 ease-out relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:bg-orange-500/10"></div>
              <div className="text-5xl mb-6 relative z-10 drop-shadow-md">💨</div>
              <p className="text-slate-400 font-medium tracking-wide mb-1">Gas Level</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl font-black text-orange-400 tracking-tight">{report.gasLevel}</h3>
                <span className="text-orange-400/60 font-semibold text-lg">ppm</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-slate-900 to-[#0c1222] rounded-3xl border border-red-500/20 p-8 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.3)] hover:-translate-y-2 transition-all duration-300 ease-out relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:bg-red-500/10"></div>
              <div className="text-5xl mb-6 relative z-10 drop-shadow-md">🌡️</div>
              <p className="text-slate-400 font-medium tracking-wide mb-1">Temperature</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl font-black text-red-400 tracking-tight">{report.temperature}</h3>
                <span className="text-red-400/60 font-semibold text-lg">°C</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-slate-900 to-[#0c1222] rounded-3xl border border-emerald-500/20 p-8 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] hover:-translate-y-2 transition-all duration-300 ease-out relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:bg-emerald-500/10"></div>
              <div className="text-5xl mb-6 relative z-10 drop-shadow-md">{report.lidStatus === "Open" ? "🔓" : "🔒"}</div>
              <p className="text-slate-400 font-medium tracking-wide mb-1">Lid Status</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-emerald-400 tracking-tight">{report.lidStatus}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl border border-slate-700 shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-emerald-500/40 transition-colors duration-500">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              🤖
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">AI Risk Category</h2>
              <p className="text-slate-400 mt-1 font-medium">Real-time deep learning assessment</p>
            </div>
          </div>
          <div className="bg-slate-950/50 px-8 py-4 rounded-2xl border border-slate-700/50 shadow-inner">
            <h3 className={`text-4xl font-black tracking-wide uppercase ${getRiskColor(report.floodRisk)}`}>
              {report.floodRisk}
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-2 bg-cyan-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-100">
              Historical Analytics
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {charts.map((chart, index) => (
              <div key={index} className="group bg-[#0B1120] rounded-[2rem] p-5 border border-slate-800 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-5 px-3">
                  <h3 className="text-lg font-bold text-slate-300 tracking-wide">{chart.title}</h3>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: `#${chart.color}` }}></div>
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/50">
                  <iframe
                    title={chart.title}
                    className="w-full h-72 opacity-90 group-hover:opacity-100 transition-opacity"
                    src={`https://thingspeak.com/channels/${channels[selectedLid].id}/charts/${chart.field}?bgcolor=%230c0f0f&color=${chart.color}&dynamic=true&type=spline&update=15`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 bg-slate-900/80 backdrop-blur-lg rounded-[2rem] border border-cyan-500/20 shadow-2xl p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
          <span className="text-cyan-400">⚡</span> Actions & Exports
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white transition-all px-8 py-4 rounded-2xl text-base font-bold shadow-lg border border-slate-600 hover:border-cyan-500/50 group"
          >
            <span className="group-hover:scale-110 transition-transform">🖨️</span> Print Report
          </button>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white transition-all px-8 py-4 rounded-2xl text-base font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] border border-cyan-400/20 group"
          >
            <span className="group-hover:-translate-y-1 transition-transform">📄</span> Download PDF
          </button>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all px-8 py-4 rounded-2xl text-base font-bold shadow-lg border border-slate-600 ml-auto group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">⬅</span> Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}