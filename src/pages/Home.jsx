import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "./AboutSection"
import ServicesSection from "./ServicesSection";
import FaqSection from "./FaqSection";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <FaqSection />
        <TeamSection />
        <ContactSection />
        <Footer />
        
    </>
  );
}
