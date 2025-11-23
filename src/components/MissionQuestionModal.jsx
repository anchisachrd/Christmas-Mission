// src/components/MissionQuestionModal.jsx
import { useState } from "react";
import { sendMissionAnswer } from "../utils/sendMissionAnswer";

export default function MissionQuestionModal({ mission, onClose }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSend = async () => {
    if (!answer.trim()) {
      setError("Please write something for me or I get mad");
      return;
    }
    // clear error
    setError("");
    setIsSending(true);
    setSuccessMessage("");

    try {
      await sendMissionAnswer({ mission, answer });
      setSuccessMessage("Your answer has flown into my inbox 💌");
      // optional: close after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Try again, my love 💔");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* dim background */}
      <div className="absolute inset-0 " onClick={onClose} />

      {/* card */}
      <div
        className="relative z-10 w-[280px] rounded-[18px] bg-[#FFF]
                   px-4 py-5 mt-24  animate-envelope-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xs px-2 py-1 rounded-full
                     bg-[#EEE9E9]/80 text-[#4B3A32] font-bold"
        >
          ✕
        </button>

        <p className="text-[14px] text-center text-[#4B3A32] mt-5 mb-3">
          {mission?.question}
        </p>

        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError("");
          }}
          className="w-full h-44 rounded-md 
                     bg-[#F3F3F3] text-[11px] text-[#4B3A32] p-2
                     outline-none focus:ring-1 focus:ring-[#7D944F]"
        />

        {/* 🔥 validation message */}
        {error && (
          <p className="text-red-600 text-[12px] mt-1 font-nunito text-center">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="mt-1 text-[12px] text-green-600 font-nunito text-center">
            {successMessage}
          </p>
        )}

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSend}
            className="px-4 py-1.5 rounded-md bg-[#7D944F] text-white text-sm"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
