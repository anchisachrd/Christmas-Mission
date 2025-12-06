import Snow from "../components/SnowDrop";
import MissionEnvelope from "../components/MissionEnvelope";
import { useState, useEffect } from "react";
import MissionQuestionModal from "../components/MissionQuestionModal";
import CountDown from "../components/CountDown";
import { getCurrentMission } from "../utils/getCurrentMission";
import Mailbox from "../components/Mailbox";
import RewardModal from "../components/RewardModal";
import ChristmasDay from "./ChristmasDay.jsx";

export default function MissionScreen() {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMissionCompleted, setIsMissionCompleted] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const { mission, index, isAfterAllMissions } = getCurrentMission();

  useEffect(() => {
  localStorage.setItem("xmas_current_mission_index", index);
}, [index]);


  if (isAfterAllMissions) {
    return <ChristmasDay />;
  }

  // key สำหรับเก็บสถานะ mission วันนี้ทำเสร็จหรือยัง
  const storageKey = mission != null ? `mission_completed_${index}` : null;

  // ⬅️ ตอน mount / mission เปลี่ยน → เช็คว่าเคยทำเสร็จแล้วไหม
  useEffect(() => {
    if (!storageKey) return;

    try {
      const saved = localStorage.getItem(storageKey);
      setIsMissionCompleted(saved === "true");
    } catch (e) {
      console.error("Error reading mission completed from localStorage", e);
    }
  }, [storageKey]);

  useEffect(() => {
    setIsEnvelopeOpen(false);
    setShowQuestionModal(false);
    setShowRewardModal(false);
  }, [index]);

  const handleMissionSuccess = (answer) => {
    setIsMissionCompleted(true);
    setIsEnvelopeOpen(false);
    setShowQuestionModal(false);

    // ⬅️ เซฟว่า mission วันนี้ทำเสร็จแล้ว
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, "true");
      } catch (e) {
        console.error("Error saving mission completed to localStorage", e);
      }
    }
  };
  return (
    <>
      <div className="relative min-h-screen  flex flex-col items-center">
        {/* SNOW BEHIND EVERYTHING */}
        <Snow />

        {/* CONTENT LAYER */}
        <div className="relative z-10 w-full max-w-[390px] flex flex-col items-center">
          {/* TOP — Countdown */}
          <div className="mt-20">
            <CountDown />
          </div>

          {/* MIDDLE */}
          <div className="mt-24">
            {isMissionCompleted ? (
              // หลังตอบเสร็จ → แสดง mailbox
              <Mailbox onClick={() => setShowRewardModal(true)} />
            ) : (
              // ก่อนตอบเสร็จ → ซองจดหมาย
              <MissionEnvelope
                isOpen={isEnvelopeOpen}
                setIsOpen={setIsEnvelopeOpen}
                onOpened={() => setShowQuestionModal(true)}
                mission={mission}
              />
            )}
          </div>

          {/* ข้อความใต้ mailbox ตอน complete */}
          {isMissionCompleted && (
            <p className="mt-16 px-20 text-sm leading-relaxed text-[#83593E] text-center">
              {mission?.completeText}
            </p>
          )}
        </div>

        {/* QUESTION MODAL — ให้เขาตอบคำถามเรา */}
        {showQuestionModal && (
          <MissionQuestionModal
            mission={mission}
            onClose={() => {
              setShowQuestionModal(false);
              setIsEnvelopeOpen(false);
            }}
            onSuccess={handleMissionSuccess} // 👈 เพิ่ม prop นี้
          />
        )}

        {/* REWARD MODAL — คำตอบของเรา / ของขวัญ */}
        {showRewardModal && mission && (
          <RewardModal
            text={mission.rewardText}
            title={mission.rewardTitle}
            onClose={() => setShowRewardModal(false)}
          />
        )}
      </div>
    </>
  );
}
