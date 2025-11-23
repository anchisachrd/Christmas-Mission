import { MISSIONS, MISSIONS_START_DATE } from "../config/missions";

export function getCurrentMission() {
  const now = new Date(); // 🔔 user local time
  const diffMs = now.getTime() - MISSIONS_START_DATE.getTime();
  const dayIndex = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 0,1,2,...

  if (dayIndex < 0) {
    // before missions start
    return { mission: null, index: -1 };
  }

  const clampedIndex = Math.min(dayIndex, MISSIONS.length - 1);
  return {
    mission: MISSIONS[clampedIndex],
    index: clampedIndex,
  };
}
