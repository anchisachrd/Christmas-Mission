// src/components/Landing.jsx
import ChristmasTree from "../components/ChristmasTree";

export default function Landing({ onTapStart }) {
  return (
    <div
      className="min-h-screen flex justify-center bg-[#EEDCC5]" // beige bg
      onClick={onTapStart} // tap anywhere to start
    >
      <div className="w-full max-w-[390px] flex flex-col items-center justify-between py-10">
        {/* Top spacer + tree */}
        <div className="flex-1 flex items-center justify-center">
          <ChristmasTree />
        </div>

        {/* Bottom text */}
        <p className="font-cinzel text-sm mb-2">
          Tap to begin your Christmas
        </p>
      </div>
    </div>
  );
}
