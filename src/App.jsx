import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/AboutSection";
import LiveStatus from "./pages/LiveStatus";
import Lid1 from "./pages/Lid1";
import Lid2 from "./pages/Lid2";
import Lid3 from "./pages/Lid3";
import LidHistory from "./pages/LidHistory";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="#about" element={<About />} />
        <Route path="/live-status" element={<LiveStatus />} />
        <Route path="/lid1" element={<Lid1 />} />
         <Route path="/lid2" element={<Lid2 />} />
        <Route path="/lid3" element={<Lid3 />} />
         <Route path="/history/:lidId" element={<LidHistory />} />
      </Routes>
    </>
  );
}
