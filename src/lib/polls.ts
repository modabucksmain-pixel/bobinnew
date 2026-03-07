// Polls — localStorage based (Supabase removed)

export interface PollOption {
  id: string;
  poll_id: string;
  option_text: string;
  vote_count: number;
}

export interface PollWithOptions {
  id: string;
  question: string;
  description: string | null;
  end_date: string;
  total_votes: number;
  options: PollOption[];
}

const STORAGE_KEY = 'polls';
const VOTES_KEY = 'poll_votes';

function getAll(): PollWithOptions[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveAll(items: PollWithOptions[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Track user IP votes
function getUserVotes(): Record<string, string[]> {
  try { return JSON.parse(localStorage.getItem(VOTES_KEY) || '{}'); }
  catch { return {}; }
}

function saveUserVotes(votes: Record<string, string[]>) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export async function getActivePolls(): Promise<PollWithOptions[]> {
  const now = new Date().toISOString();
  return getAll().filter(p => p.end_date > now);
}

export async function hasUserVoted(pollId: string, userIp: string): Promise<boolean> {
  const votes = getUserVotes();
  return votes[pollId]?.includes(userIp) || false;
}

export async function voteOnPoll(pollId: string, optionId: string, userIp: string) {
  const votes = getUserVotes();
  if (votes[pollId]?.includes(userIp)) {
    return { success: false, error: 'Zaten oy kullandınız.' };
  }

  const items = getAll();
  const poll = items.find((p) => p.id === pollId);
  if (!poll) return { success: false, error: 'Anket bulunamadı.' };

  const option = poll.options.find((o) => o.id === optionId);
  if (!option) return { success: false, error: 'Seçenek bulunamadı.' };

  option.vote_count++;
  poll.total_votes++;

  if (!votes[pollId]) votes[pollId] = [];
  votes[pollId].push(userIp);

  saveAll(items);
  saveUserVotes(votes);
  return { success: true };
}

// Admin functions (mocked for compatibility)
export async function getAllPolls() { return getAll(); }
export async function getPoll(id: string) { return getAll().find(p => p.id === id); }
export async function createPoll(payload: any) { return { success: true, data: payload }; }
export async function deletePoll(id: string) {
  saveAll(getAll().filter(p => p.id !== id));
  return { success: true };
}
