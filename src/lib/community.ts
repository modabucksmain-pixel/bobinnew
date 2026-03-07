// Community — localStorage based (Supabase removed)

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  author_id: string;
  published: boolean;
  pinned: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'community_posts';

function getAll(): CommunityPost[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveAll(items: CommunityPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function getCommunityPosts(limit?: number): Promise<CommunityPost[]> {
  let items = getAll()
    .filter((p) => p.published)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.created_at.localeCompare(a.created_at));
  if (limit) items = items.slice(0, limit);
  return items;
}

export async function getCommunityPost(id: string): Promise<CommunityPost | null> {
  const items = getAll();
  const post = items.find((p) => p.id === id && p.published);
  if (post) {
    post.views++;
    saveAll(items);
  }
  return post || null;
}

export async function createCommunityPost(post: Omit<CommunityPost, 'id' | 'views' | 'created_at' | 'updated_at'>) {
  const items = getAll();
  const newPost: CommunityPost = { ...post, id: crypto.randomUUID(), views: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  items.push(newPost);
  saveAll(items);
  return { success: true, data: newPost };
}

export async function updateCommunityPost(id: string, updates: Partial<CommunityPost>) {
  const items = getAll();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return { success: false, error: 'Not found' };
  items[idx] = { ...items[idx], ...updates, updated_at: new Date().toISOString() };
  saveAll(items);
  return { success: true, data: items[idx] };
}

export async function deleteCommunityPost(id: string) {
  saveAll(getAll().filter((p) => p.id !== id));
  return { success: true };
}
