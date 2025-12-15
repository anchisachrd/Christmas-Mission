// src/components/RewardModal.jsx
export default function RewardModal({ text, title, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10" onClick={onClose} />
      <div
        className="relative z-10 w-[280px] rounded-[18px] bg-[#FFF8ED]
                   px-5 py-6 mt-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xs px-2 py-1 rounded-full
                     bg-[#EEE9E9]/80 text-[#4B3A32] font-bold"
        >
          ✕
        </button>

        <p className="font-nunito text-sm text-center px-4 whitespace-pre-line">{title}</p>
        <textarea
          value={text}
          className="w-full h-72 rounded-md mt-5
                     bg-[#F3F3F3] text-[13px] text-[#4B3A32] p-2
                     outline-none cursor-not-allowed text-justify whitespace-pre-line"
                    readOnly
        />
      </div>
    </div>
  );
}
