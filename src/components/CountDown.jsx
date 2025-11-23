import { useEffect, useState } from "react";


function getTimeLeft(targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}
export default function CountDown({
    // เปลี่ยนวันตามที่อยากนับถอยหลัง
  targetDate = "2025-12-25T00:00:00", // Christmas midnight
}) {

    
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
 useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <>
      <div className="flex gap-2 mb-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="w-[60px] h-[70px] bg-[#D8C19A]/50 rounded-md flex flex-col items-center justify-center"
          >
            <span className="font-cinzel text-2xl text-[#4B3A32]">
              {item.value}
            </span>
            <span className="font-nunito text-[9px] pt-1 tracking-[0.15em] text-[#4B3A32]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p className="font-cinzel text-sm text-center tracking-[0.1em] text-[#83593E] mb-10">
        ------ Before Christmas ------
      </p>
      
    </>
  );
}
