import React, { useState } from "react";

export default function AgreementModal({onStart}) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const correctNames = ["Devin", "Dev", "Baby"];

  const handleStart = () => {
    const input = name.trim().toLowerCase();

    // CASE 1: nothing typed
    if (input === "") {
      setErrorMessage(
        "Please enter your full name to sign the agreement that you cannot disagree with"
      );
      return;
    }

    // CASE 2: wrong name
    const isValid = correctNames.some(
      (n) => n.toLowerCase() === input
    );

    if (!isValid) {
      setErrorMessage("This is not your name baby");
      return;
    }

    // CASE 3: correct name
    setErrorMessage("");
    onStart(); // <-- call this when you connect it to the next page
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div
        className="
          translate-y-40 w-[280px] rounded-[24px] bg-[#D9D6D6]/60
          px-3 py-6 
        "
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg text-[#4B3A32] font-cinzel text-center mb-4">
          Before You Begin
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
            setErrorMessage(""); // ✅ reset message when he types
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

        {/* Dynamic message */}
        <p
          className={`
            text-center text-[11px] font-nunito mb-6 transition-colors
            ${errorMessage ? "text-red-600" : "text-[#4B3A32]"}
          `}
        >
          {errorMessage ||
            "Please enter your full name to sign the agreement that you cannot disagree with"}
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="px-4 py-1.5 rounded-md text-white text-base bg-[#7D944F]"
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  );
}
