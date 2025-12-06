import Landing from "./pages/Landing";
import MissionScreen from "./pages/MissionScreen";
import { useState, useEffect } from "react";

const PHASE_KEY = "xmas_phase_v1";
const TODAY_KEY = new Date().toISOString().slice(0,10);


export default function App() {
  // อ่านค่า phase จาก localStorage แค่ตอน mount ครั้งแรก
  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined") return "landing";

    const saved = localStorage.getItem(PHASE_KEY);

    // ถ้าเคยเข้า mission แล้ว ให้กลับมาที่ mission เลย
    if (saved === "mission") {
      return "mission";
    }

    // ค่า default ครั้งแรกที่ยังไม่เคยเล่น
    return "landing";
  });

  // เวลาที่ phase เปลี่ยนเป็น "mission" ให้เซฟลง localStorage
  useEffect(() => {
    if (phase === "mission") {
      localStorage.setItem(PHASE_KEY, "mission");
    }
  }, [phase]);

  useEffect(() => {
  const lastDay = localStorage.getItem("xmas_last_open_app_day");

  // ถ้าวันใหม่ → reset phase เพราะเราต้องเข้า mission ของวันใหม่เสมอ
  if (lastDay !== TODAY_KEY) {
    localStorage.setItem("xmas_last_open_app_day", TODAY_KEY);
    setPhase("mission");
    localStorage.setItem(PHASE_KEY, "mission");
  }
}, []);


  const handleStartMissions = () => {
    // เริ่ม transition จาก landing → fadeOut → missionFadeIn → mission
    setPhase("fadeOut");

    setTimeout(() => {
      setPhase("missionFadeIn");

      setTimeout(() => {
        setPhase("mission"); // ตรงนี้จะไป trigger useEffect ด้านบน → เซฟ localStorage
      }, 700);
    }, 700);
  };

  const showLanding = phase === "landing" || phase === "fadeOut";
  const showMission = phase === "missionFadeIn" || phase === "mission";

  return (
    <div className="relative min-h-screen bg-[#F7EEDC] overflow-hidden flex justify-center">
      {/* Landing + modals */}
      {showLanding && (
        <div
          className={`
            absolute inset-0 flex justify-center
            transition-opacity duration-700
            ${
              phase === "landing"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }
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
          <MissionScreen key={localStorage.getItem("xmas_current_mission_index")} />

        </div>
      )}
    </div>
  );
}
