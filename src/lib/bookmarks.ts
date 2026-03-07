// Bookmarks — localStorage based (Supabase removed)

export interface Bookmark {
  id: string;
  type: 'video' | 'blog' | 'project';
  itemId: string;
  title: string;
  createdAt: string;
}

const STORAGE_KEY = 'bookmarks';

function getAll(): Bookmark[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveAll(items: Bookmark[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export function getBookmarks(): Bookmark[] {
  return getAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addBookmark(type: Bookmark['type'], itemId: string, title: string): Bookmark {
  const items = getAll();
  const existing = items.find((b) => b.type === type && b.itemId === itemId);
  if (existing) return existing;
  const newBookmark: Bookmark = { id: crypto.randomUUID(), type, itemId, title, createdAt: new Date().toISOString() };
  items.push(newBookmark);
  saveAll(items);
  return newBookmark;
}

export function removeBookmark(id: string) {
  saveAll(getAll().filter((b) => b.id !== id));
}

export function isBookmarked(type: Bookmark['type'], itemId: string): boolean {
  return getAll().some((b) => b.type === type && b.itemId === itemId);
}
