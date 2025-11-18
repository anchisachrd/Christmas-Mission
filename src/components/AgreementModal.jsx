import React from "react";
import { useState } from "react";

export default function AgreementModal() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const correctNames = ["Devin", "Dev", "Baby"];

  const handleStart = () => {
    const input = name.trim().toLowerCase();

    // check if input matches ANY correct name
    const isValid = correctNames.some((n) => n.toLowerCase() === input);

    if (!isValid) {
      setError(true);
      console.log("Invalid name entered:", name);
      return;
    }

    setError(false);
    // onStart();
    console.log("Agreement accepted, starting missions...");
  };

  return (
    <div
      className="fixed inset-0 flex items-start justify-center z-50"
      //   onClick={onClose}
    >
      <div
        className="
          translate-y-40 w-[280px] rounded-[24px] bg-[#D9D6D6]/60
          px-3 py-6 
        "
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking content
      >
        <p className="text-lg text-[#4B3A32] font-cinzel text-center mb-4">
          Before You Begin, Babe
        </p>

        <div className="text-[#4B3A32] text-base text-center mb-3">
          <p>
            <span className="font-bold">1.</span> A new mission appears every
            midnight. You have until the next midnight to complete it.
          </p>

          <p className="mt-2">
            <span className="font-bold">2.</span> If you miss a mission… I am
            legally allowed to not say “I love you” to you until next year.
            <span className="italic"> Don’t test me.</span>
          </p>
        </div>

        {/* Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          className="
            w-full mt-1 mb-2
            px-1 py-1 
            rounded-md 
            bg-white/60 
            border border-[#D3C7B9]
            text-[#4B3A32]
            outline-none
            focus:ring-1 focus:ring-[#7D944F]
          "
        />
         <p
          className={`text-center text-[11px] font-nunito mb-6 transition-colors ${
            error ? "text-red-600" : "text-[#4B3A32]"
          }`}
        >
          Please enter your full name to sign the agreement that you cannot
          disagree with
        </p>

        <div className="flex justify-center">
          <button
          onClick={handleStart}
        className={`px-4 py-1.5 rounded-md text-white text-base bg-[#7D944F]`}
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  );
}
