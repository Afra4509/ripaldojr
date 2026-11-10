import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectOverview from "@/components/ProjectOverview";
import RobotShowcase from "@/components/RobotShowcase";
import HardwareGallery from "@/components/HardwareGallery";
import ElectronicsSection from "@/components/ElectronicsSection";
import KinematicsSection from "@/components/KinematicsSection";
import DevelopmentTimeline from "@/components/DevelopmentTimeline";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import TeamSection from "@/components/TeamSection";
import ClosingSection from "@/components/ClosingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectOverview />
        <RobotShowcase />
        <HardwareGallery />
        <ElectronicsSection />
        <KinematicsSection />
        <DevelopmentTimeline />
        <TechnicalSpecs />
        <TeamSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
