import Landing from './pages/Landing'
import AgreementModal from './components/AgreementModal'
import MissionScreen from './pages/MissionScreen'
import Snow from './components/SnowDrop'

import { useState } from 'react'  

export default function App() {
  // phase: landing -> fadeOut -> missionFadeIn -> mission
  const [phase, setPhase] = useState("landing");

  const handleStartMissions = () => {
    // called from AgreementModal -> Landing -> App
    setPhase("fadeOut");

    // after fade-out, start mission fade-in
    setTimeout(() => {
      setPhase("missionFadeIn");
      // after fade-in, settle to mission
      setTimeout(() => setPhase("mission"), 700);
    }, 700);
  };

  const showLanding = phase === "landing" || phase === "fadeOut";
  const showMission = phase === "missionFadeIn" || phase === "mission";

  return (
    <div className="relative min-h-screen bg-[#F7EEDC] overflow-hidden flex justify-center">
      {/* ❄️ Snow as global overlay */}
      {/* <Snow /> */}

      {/* Landing + modals */}
      {showLanding && (
        <div
          className={`
            absolute inset-0 flex justify-center
            transition-opacity duration-700
            ${phase === "landing" ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <Landing onTapStart={handleStartMissions} />
        </div>
      )}

      {/* Mission screen */}
      {showMission && (
        <div
          className={`
            absolute inset-0 flex justify-center
            transition-opacity duration-800
            ${phase === "missionFadeIn" ? "opacity-0" : "opacity-100"}
          `}
        >
          <MissionScreen />
        </div>
      )}
    </div>
  );
}
