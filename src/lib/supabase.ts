// Supabase fully removed — this is a static mock that handles standard chaining
// Pages that still import supabase will get empty data instead of crashes

const emptyChain: any = {
  select: () => emptyChain,
  eq: () => emptyChain,
  order: () => emptyChain,
  limit: () => emptyChain,
  contains: () => emptyChain,
  textSearch: () => emptyChain,
  or: () => emptyChain,
  ilike: () => emptyChain,
  in: () => emptyChain,
  csv: () => emptyChain,
  match: () => emptyChain,
  filter: () => emptyChain,
  range: () => emptyChain,
  abortSignal: () => emptyChain,
  single: async () => ({ data: null, error: null }),
  maybeSingle: async () => ({ data: null, error: null }),
  insert: () => emptyChain,
  update: () => emptyChain,
  upsert: () => emptyChain,
  delete: () => emptyChain,
  // When the chain itself is awaited, it resolves with this:
  then: (resolve: any) => resolve({ data: [], error: null, count: 0 }),
};

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (_cb: any) => ({
      data: { subscription: { unsubscribe: () => { } } },
    }),
    signInWithOAuth: async () => ({ data: null, error: null }),
    signInWithPassword: async () => ({ data: null, error: new Error('Auth disabled') }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ data: null, error: null }),
  },
  from: (_table: string) => emptyChain,
  storage: {
    from: (_bucket: string) => ({
      upload: async () => ({ data: null, error: null }),
      getPublicUrl: (_path: string) => ({ data: { publicUrl: '' } }),
      remove: async () => ({ data: null, error: null }),
      list: async () => ({ data: [], error: null }),
    }),
  },
  rpc: async () => ({ data: null, error: null }),
  channel: (_name: string) => ({
    on: () => ({ subscribe: () => ({}) }),
    subscribe: () => ({}),
    unsubscribe: async () => { },
  }),
  removeChannel: async () => { },
};
