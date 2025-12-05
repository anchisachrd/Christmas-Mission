import Snow from "../components/SnowDrop";
import MerryChristmas from "../components/MerryChristmas";
import FlowerBouquet from "../components/FlowerBouquet";
import { useState } from "react";

export default function ChristmasDay() {
     const [showFlower, setShowFlower] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center ">
      <Snow />

      <div className="z-10 flex flex-col items-center mt-10">
        <p className="font-cinzel text-[22px]  text-[#83593E] text-center mb-16">
          Merry <br /> Christmas <br /> My Devin
        </p>

        {/* SVG ต้นคริสต์มาส */}
        <div>
           {showFlower ? (
            <FlowerBouquet />
            
          ) : (
            <MerryChristmas onGiftClick={() => setShowFlower(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
