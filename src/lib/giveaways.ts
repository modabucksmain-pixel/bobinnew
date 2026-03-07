// Giveaways — localStorage based (Supabase removed)

export interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize: string;
  image_url: string | null;
  start_date: string;
  end_date: string;
  winner_count: number;
  published: boolean;
  participants: string[];
  created_at: string;
}

export interface GiveawayParticipant {
  id: string;
  giveaway_id: string;
  user_id: string;
  is_winner: boolean;
  user_name?: string;
  user_email?: string;
  created_at: string;
}

const STORAGE_KEY = 'giveaways';

function getAll(): Giveaway[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveAll(items: Giveaway[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function getActiveGiveaways(): Promise<Giveaway[]> {
  const now = new Date().toISOString();
  return getAll().filter((g) => g.published && g.end_date >= now);
}

export async function getAllGiveaways(): Promise<Giveaway[]> {
  return getAll().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getGiveaway(id: string): Promise<Giveaway | null> {
  return getAll().find((g) => g.id === id) || null;
}

export async function createGiveaway(payload: Omit<Giveaway, 'id' | 'participants' | 'created_at'>) {
  const items = getAll();
  const newItem: Giveaway = { ...payload, id: crypto.randomUUID(), participants: [], created_at: new Date().toISOString() };
  items.push(newItem);
  saveAll(items);
  return { success: true, data: newItem };
}

export async function updateGiveaway(id: string, updates: Partial<Giveaway>) {
  const items = getAll();
  const idx = items.findIndex((g) => g.id === id);
  if (idx === -1) return { success: false, error: 'Not found' };
  items[idx] = { ...items[idx], ...updates };
  saveAll(items);
  return { success: true, data: items[idx] };
}

export async function deleteGiveaway(id: string) {
  saveAll(getAll().filter((g) => g.id !== id));
  return { success: true };
}

export async function participateInGiveaway(giveawayId: string, userId: string) {
  const items = getAll();
  const idx = items.findIndex((g) => g.id === giveawayId);
  if (idx === -1) return { success: false, error: 'Not found' };
  if (items[idx].participants.includes(userId)) return { success: false, error: 'Zaten katıldınız.' };
  items[idx].participants.push(userId);
  saveAll(items);
  return { success: true };
}

// Admin mock functions
export async function getGiveawayParticipants(giveawayId: string): Promise<GiveawayParticipant[]> {
  const g = await getGiveaway(giveawayId);
  return g?.participants.map(p => ({
    id: crypto.randomUUID(), giveaway_id: giveawayId, user_id: p, is_winner: false,
    user_name: 'User ' + p.slice(0, 4), created_at: new Date().toISOString()
  })) || [];
}

export async function selectRandomWinner(_giveawayId: string, _count: number) {
  return { success: true };
}
