// Announcements — localStorage based (Supabase removed)

export interface Announcement {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  priority: number;
  published: boolean;
  publish_at: string;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'announcements';

function getAll(): Announcement[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Auto-inject the Mega Update V2 announcement if empty
      const initial: Announcement[] = [{
        id: crypto.randomUUID(),
        title: '🚀 Mega Güncelleme V2 Tamamlandı!',
        summary: 'Site içi ışık hızında: Supabase kaldırıldı, beyaz ekran hatası düzeltildi ve Konami kodu gibi 25 yeni özellik eklendi.',
        content: '<p>Tüm altyapı localStorage tabanlı hızlandırılmış sisteme geçirildi.</p>',
        priority: 1,
        published: true,
        publish_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }];
      saveAll(initial);
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveAll(items: Announcement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
} export async function getPublishedAnnouncements(limit?: number): Promise<Announcement[]> {
  const now = new Date().toISOString();
  let items = getAll()
    .filter((a) => a.published && a.publish_at <= now)
    .sort((a, b) => b.priority - a.priority || b.publish_at.localeCompare(a.publish_at));
  if (limit) items = items.slice(0, limit);
  return items;
}

export async function getAnnouncement(id: string): Promise<Announcement | null> {
  return getAll().find((a) => a.id === id) || null;
}

export async function createAnnouncement(payload: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) {
  const items = getAll();
  const newItem: Announcement = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  items.push(newItem);
  saveAll(items);
  return { success: true, data: newItem };
}

export async function updateAnnouncement(id: string, payload: Partial<Announcement>) {
  const items = getAll();
  const idx = items.findIndex((a) => a.id === id);
  if (idx === -1) return { success: false, error: 'Not found' };
  items[idx] = { ...items[idx], ...payload, updated_at: new Date().toISOString() };
  saveAll(items);
  return { success: true, data: items[idx] };
}

export async function deleteAnnouncement(id: string) {
  const items = getAll().filter((a) => a.id !== id);
  saveAll(items);
  return { success: true };
}
