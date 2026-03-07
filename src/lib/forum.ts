// Forum — REMOVED (Supabase removed)
// This file is kept as a stub to prevent import errors

export interface ForumThread { id: string; title: string; }
export interface ForumReply { id: string; content: string; }

export async function getForumThreads() { return []; }
export async function getForumThread(_id: string) { return null; }
export async function createForumThread() { return { success: false, error: 'Forum disabled' }; }
export async function createForumReply() { return { success: false, error: 'Forum disabled' }; }
export async function deleteForumThread() { return { success: false, error: 'Forum disabled' }; }
export async function deleteForumReply() { return { success: false, error: 'Forum disabled' }; }
