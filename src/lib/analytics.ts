// Analytics — localStorage based (Supabase removed)

export interface PageView {
  path: string;
  timestamp: string;
}

const STORAGE_KEY = 'page_analytics';

export function trackPageView(path: string) {
  try {
    const views: PageView[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    views.push({ path, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views.slice(-500)));
  } catch { /* silently fail */ }
}

export function getPageViews(): PageView[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

export function getTopPages(limit = 10): { path: string; count: number }[] {
  const views = getPageViews();
  const counts: Record<string, number> = {};
  for (const v of views) {
    counts[v.path] = (counts[v.path] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
