// Projects — localStorage based (Supabase removed)

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  tags: string[];
  difficulty: string;
  published: boolean;
  featured: boolean;
  created_at: string;
}

export const difficultyLabels: Record<string, string> = {
  beginner: 'Başlangıç',
  intermediate: 'Orta',
  advanced: 'İleri'
};

export const difficultyColors: Record<string, string> = {
  beginner: 'text-green-400 bg-green-500/10 border-green-500/20',
  intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-red-400 bg-red-500/10 border-red-500/20'
};

const STORAGE_KEY = 'projects';

function getAll(): Project[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveAll(items: Project[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export async function getPublishedProjects(): Promise<Project[]> {
  return getAll().filter((p) => p.published).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getAllProjects(): Promise<Project[]> {
  return getAll().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getProject(id: string): Promise<Project | null> {
  return getAll().find((p) => p.id === id) || null;
}

export async function createProject(payload: Omit<Project, 'id' | 'created_at'>) {
  const items = getAll();
  const newItem: Project = { ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  items.push(newItem);
  saveAll(items);
  return { success: true, data: newItem };
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const items = getAll();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return { success: false, error: 'Not found' };
  items[idx] = { ...items[idx], ...updates };
  saveAll(items);
  return { success: true, data: items[idx] };
}

export async function deleteProject(id: string) {
  saveAll(getAll().filter((p) => p.id !== id));
  return { success: true };
}
