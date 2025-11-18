import dot from '../assets/snow-dot.svg';
import flake from '../assets/snow-flake.svg';

const SNOW_ITEMS = [
  { src: dot, size: 10, left: "10%", duration: 9, delay: 0 },
  { src: flake, size: 16, left: "25%", duration: 12, delay: 1 },
  { src: dot, size: 8, left: "40%", duration: 7, delay: 0.3 },
  { src: flake, size: 20, left: "55%", duration: 14, delay: 0.6 },
  { src: dot, size: 12, left: "70%", duration: 10, delay: 0.2 },
  { src: flake, size: 18, left: "85%", duration: 13, delay: 1.2 },
];

// const SNOW_ITEMS = Array.from({ length: 10 }).map(() => ({
//   src: Math.random() > 0.5 ? dot : flake,
//   size: Math.random() * 12 + 8,
//   left: Math.random() * 100 + "%",
//   duration: Math.random() * 6 + 8,
//   delay: Math.random() * 3,
// }));


export default function SnowDrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      {SNOW_ITEMS.map((item, i) => (
        <img
          key={i}
          src={item.src}
          className="snow-fall absolute"
          style={{
            width: item.size,
            height: item.size,
            left: item.left,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}
    </div>
  );
}