// Watch History — localStorage based (Supabase removed)

export interface WatchEntry {
  videoId: string;
  title: string;
  watchedAt: string;
  progress: number;
}

const STORAGE_KEY = 'watch_history';

function getAll(): WatchEntry[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

export function getWatchHistory(): WatchEntry[] {
  return getAll().sort((a, b) => b.watchedAt.localeCompare(a.watchedAt));
}

export function addToWatchHistory(videoId: string, title: string, progress = 0) {
  const items = getAll().filter((e) => e.videoId !== videoId);
  items.unshift({ videoId, title, watchedAt: new Date().toISOString(), progress });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 50)));
}

export function getWatchProgress(videoId: string): number {
  return getAll().find((e) => e.videoId === videoId)?.progress || 0;
}
