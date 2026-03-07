// Video Suggestions — localStorage based (Supabase removed)

export interface VideoSuggestion {
    id: string;
    title: string;
    description: string;
    submitter_name: string | null;
    status: string; // 'pending', 'approved', 'completed', 'rejected'
    votes: number;
    created_at: string;
}

const STORAGE_KEY = 'video_suggestions';

function getAll(): VideoSuggestion[] {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
}

function saveAll(items: VideoSuggestion[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function getSuggestions(): Promise<VideoSuggestion[]> {
    return getAll().sort((a, b) => b.votes - a.votes || b.created_at.localeCompare(a.created_at));
}

export async function submitSuggestion(payload: { title: string; description: string; submitter_name: string | null }) {
    const items = getAll();
    const newSuggestion: VideoSuggestion = {
        ...payload,
        id: crypto.randomUUID(),
        status: 'pending',
        votes: 1, // Start with 1 vote from the submitter
        created_at: new Date().toISOString()
    };
    items.push(newSuggestion);
    saveAll(items);

    // Track that this user voted on their own suggestion
    localStorage.setItem(`voted_${newSuggestion.id}`, 'true');

    return { success: true, data: newSuggestion };
}

export async function voteSuggestion(id: string) {
    const votedKey = `voted_${id}`;
    if (localStorage.getItem(votedKey)) return { success: false, error: 'Zaten oy kullandınız.' };

    const items = getAll();
    const suggestion = items.find(s => s.id === id);
    if (!suggestion) return { success: false, error: 'Fikir bulunamadı.' };

    suggestion.votes++;
    saveAll(items);
    localStorage.setItem(votedKey, 'true');

    return { success: true };
}

export function hasVoted(id: string): boolean {
    return localStorage.getItem(`voted_${id}`) !== null;
}
