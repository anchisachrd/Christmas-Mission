// src/components/Landing.jsx
import ChristmasTree from "../components/ChristmasTree";
import Snow from "../components/SnowDrop";
import ConfirmModal from "../components/ConfirmModal";
import AgreementModal from "../components/AgreementModal";
import { useState } from "react";

export default function Landing({ onTapStart }) {
  const [modalStep, setModalStep] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);

  const handleScreenTap = () => {
    if (modalStep === 0 && !showAgreement) setModalStep(1);
  };

  const modalTexts = {
    1: "Are you ready for Christmas?",
    2: "You have no choice baby😋",
    3: "I have 7 little missions for you \nbefore Christmas....complete them all \nto make a wish come true",
    4: "You have no choice again baby",
  };

  const greenButton = "bg-[#7D944F] active:bg-[#6B7E41]";
  const redButton = "bg-[#B06060] active:bg-[#9A4F4F]";

  // 🟢 buttons for each step
  const getButtonsForStep = () => {
    if (modalStep === 1) {
      // step 1: yes / yes → both go to step 2
      return [
        {
          label: "yes",
          className: redButton,
          onClick: () => setModalStep(2),
        },
        {
          label: "yes",
          className: greenButton,
          onClick: () => setModalStep(2),
        },
      ];
    }

    if (modalStep === 2) {
      // step 2: one button "next" → go to step 3
      return [
        {
          label: "next",
          className: greenButton,
          onClick: () => setModalStep(3),
        },
      ];
    }

    if (modalStep === 3) {
      // step 3: alright / alright → both start mission
      return [
        {
          label: "Alright 1",
          className: redButton,
          onClick: () => setModalStep(4),
        },
        {
          label: "Alright 2",
          className: greenButton,
          onClick: () => setModalStep(4),
        },
      ];
    }

    if (modalStep === 4) {
      // step 2: one button "next" → go to step 3
      return [
        {
          label: "next",
          className: greenButton,
           onClick: () => {
            setShowAgreement(true);
            setModalStep(0);
          
          },
        },
      ];
    }

    return [];
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      onClick={handleScreenTap}
    >
      {/* 🎄 Tree + text */}
      <div className="relative z-10 w-full max-w-[390px] flex flex-col items-center py-10">
        <div
          className={`
            transition-transform duration-500 ease-out
            ${
              modalStep > 0 || showAgreement
                ? "translate-y-52"
                : "translate-y-0"
            }
          `}
        >
          <div className="w-[220px]">
            <ChristmasTree />
          </div>
        </div>

        <p
          className={`
            font-cinzel text-[13px] tracking-[0.18em] text-[#6D5140] mt-7
            transition-opacity duration-300
            ${modalStep > 0 || showAgreement ? "opacity-0" : "opacity-100"}
          `}
        >
          Tap to begin your Christmas
        </p>
      </div>

      {/* ❄️ Snow */}
      <Snow />

      {/* 💌 One modal, content depends on modalStep */}
      {modalStep > 0 && (
        <ConfirmModal
          title={modalTexts[modalStep]}
          buttons={getButtonsForStep()}
          onClose={() => setModalStep(0)}
        />
      )}

      {showAgreement && (
        <AgreementModal
          onStart={onTapStart} // when he clicks "Let’s start"
        />
      )}
    </div>
  );
}
