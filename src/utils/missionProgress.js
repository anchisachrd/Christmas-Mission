const STORAGE_KEY = "xmasMissionProgress_v1";

export function loadMissionProgress() {
  if (typeof window === "undefined") return null; // กันตอน SSR ถ้ามี

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Cannot parse mission progress", e);
    return null;
  }
}

export function saveMissionProgress(progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getTodayKey() {
  // เก็บเฉพาะ yyyy-mm-dd เพื่อเทียบวัน
  return new Date().toISOString().slice(0, 10);
}