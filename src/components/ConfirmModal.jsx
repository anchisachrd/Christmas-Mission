import React from "react";
export default function ConfirmModal({
  title,
  description,
  buttons = [],
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 flex items-start justify-center z-50"
      onClick={onClose}
    >
     
        <div
          className="
          translate-y-48 w-[280px] rounded-[24px] bg-[#D9D6D6]/60
          px-3 py-6 
          animate-fade-in scale-100
        "
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking content
        >
          <p className="text-lg text-[#4B3A32] text-center mb-4">{title}</p>

          {description && (
            <p className="text-[#4B3A32] text-xs text-center mb-3 font-nunito">
              {description}
            </p>
          )}

          <div className="flex justify-center gap-3 mt-2">
            {buttons.map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={`px-4 py-1.5 rounded-md text-white text-base ${btn.className}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
  
  );
}
