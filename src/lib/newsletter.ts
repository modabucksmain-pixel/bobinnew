// Newsletter — localStorage based (Supabase removed)

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

const STORAGE_KEY = 'newsletter_subs';

export async function subscribeToNewsletter(email: string) {
  try {
    const subs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as NewsletterSubscriber[];
    if (subs.some(s => s.email === email)) return { success: false, error: 'Zaten abonesiniz.' };
    subs.push({
      id: crypto.randomUUID(),
      email,
      subscribed_at: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
    return { success: true };
  } catch {
    return { success: false, error: 'Bir hata oluştu.' };
  }
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
