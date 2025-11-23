import Snow from "../components/SnowDrop";
import MissionEnvelope from "../components/MissionEnvelope";
import { useState, useEffect } from "react";
import MissionQuestionModal from "../components/MissionQuestionModal";
import CountDown from "../components/CountDown";
import { getCurrentMission } from "../utils/getCurrentMission";

export default function MissionScreen() {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [currentMission, setCurrentMission] = useState(null);
  const currentMissionNumber = getCurrentMission();
  const { mission } = getCurrentMission();

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

          {/* MIDDLE — Envelope */}
          <div className="mt-24">
            <MissionEnvelope
              isOpen={isEnvelopeOpen}
              setIsOpen={setIsEnvelopeOpen}
              onOpened={() => setShowQuestionModal(true)}
              mission={mission}
            />
          </div>
        </div>

        {showQuestionModal && (
          <MissionQuestionModal
            mission={mission}
            onClose={() => {
              setShowQuestionModal(false);
              setIsEnvelopeOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
}
