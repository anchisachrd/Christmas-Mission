import { MISSIONS } from "../config/missions";

const FIXED_START_DATE = new Date("2025-12-13T00:00:00");
const STORAGE_DAY_KEY = "xmas_last_open_date_v1";
const STORAGE_MISSION_KEY = "xmas_locked_mission_index_v1";


function getTodayKey() {
  const now = new Date(); // ใช้เวลา local ของ device
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 0-based
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getCurrentMission() {
  const todayKey = getTodayKey();

  // --- 1) คำนวณ mission index ตามวันที่จริง ---
  const now = new Date();
  const diffMs = now.getTime() - FIXED_START_DATE.getTime();
  const calculatedIndex = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // day 0 = mission 1

  // กันติดลบกรณียังไม่ถึงวันเริ่ม
  if (calculatedIndex < 0) {
    return {
      mission: null,
      index: -1,
      isAfterAllMissions: false,
    };
  }

  const maxIndex = MISSIONS.length - 1;
  const clampedIndex = Math.min(calculatedIndex, maxIndex);
  const isAfterAllMissions = calculatedIndex > maxIndex;

  // --- 2) อ่าน localStorage ---
  const lastOpenDate = localStorage.getItem(STORAGE_DAY_KEY);
  const lockedIndex = localStorage.getItem(STORAGE_MISSION_KEY);

  // --- 3) ถ้าเคยเปิดวันนี้แล้ว → ใช้ index เดิมที่ล็อกไว้ ---
  if (lastOpenDate === todayKey && lockedIndex !== null) {
    return {
      mission: MISSIONS[lockedIndex] || null,
      index: Number(lockedIndex),
      isAfterAllMissions,
    };
  }

  // --- 4) ถ้ายังไม่เคยเปิดวันนี้ → บันทึกค่าใหม่ลง localStorage ---
  localStorage.setItem(STORAGE_DAY_KEY, todayKey);
  localStorage.setItem(STORAGE_MISSION_KEY, clampedIndex);

  return {
    mission: MISSIONS[clampedIndex] || null,
    index: clampedIndex,
    isAfterAllMissions,
  };
}
