export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isVertical?: boolean;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  durationSeconds?: number;
}

export interface ChannelStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

const CACHE_DURATION = 3600000; // 1 hour

function getCachedData<T>(cacheKey: string): T | null {
  try {
    const raw = localStorage.getItem(`yt_cache_${cacheKey}`);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (new Date(expiresAt) < new Date()) {
      localStorage.removeItem(`yt_cache_${cacheKey}`);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCachedData(cacheKey: string, data: unknown): void {
  try {
    const expiresAt = new Date(Date.now() + CACHE_DURATION).toISOString();
    localStorage.setItem(`yt_cache_${cacheKey}`, JSON.stringify({ data, expiresAt }));
  } catch {
    // localStorage full or unavailable
  }
}

function getYouTubeApiKey(): string | null {
  return import.meta.env.VITE_YOUTUBE_API_KEY || null;
}

function getYouTubeChannelId(): string | null {
  return import.meta.env.VITE_YOUTUBE_CHANNEL_ID || null;
}

export async function getChannelStats(): Promise<ChannelStats | null> {
  const cached = getCachedData<ChannelStats>('channel_stats');
  if (cached) return cached;

  const apiKey = getYouTubeApiKey();
  const channelId = getYouTubeChannelId();

  if (!apiKey || !channelId) {
    return { subscriberCount: '0', viewCount: '0', videoCount: '0' };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );

    if (!response.ok) throw new Error('Failed to fetch channel stats');

    const data = await response.json();
    const stats = data.items?.[0]?.statistics;

    if (!stats) throw new Error('No stats found');

    const channelStats: ChannelStats = {
      subscriberCount: stats.subscriberCount || '0',
      viewCount: stats.viewCount || '0',
      videoCount: stats.videoCount || '0',
    };

    setCachedData('channel_stats', channelStats);
    return channelStats;
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return { subscriberCount: '0', viewCount: '0', videoCount: '0' };
  }
}

function parseDurationToSeconds(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
}

function getPreferredThumbnail(thumbnails: Record<string, { url: string; width?: number; height?: number }>): { url: string; width?: number; height?: number } {
  for (const key of ['maxres', 'standard', 'high', 'medium', 'default']) {
    const option = thumbnails?.[key];
    if (option?.url) return option;
  }
  return { url: '' };
}

export async function getLatestVideos(maxResults: number = 12): Promise<YouTubeVideo[]> {
  const cached = getCachedData<YouTubeVideo[]>('latest_videos');
  if (cached?.length) return cached;

  const apiKey = getYouTubeApiKey();
  const channelId = getYouTubeChannelId();

  if (!apiKey || !channelId) {
    console.error('Missing YouTube credentials');
    return [];
  }

  try {
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('YouTube API Error:', errorData);
      throw new Error('Failed to fetch videos');
    }

    const searchData = await searchResponse.json();

    if (!searchData.items?.length) return [];

    const videoIds = searchData.items.map((item: { id: { videoId: string } }) => item.id.videoId).join(',');
    if (!videoIds) return [];

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`
    );

    if (!videosResponse.ok) throw new Error('Failed to fetch video details');

    const videosData = await videosResponse.json();

    const videos: YouTubeVideo[] =
      videosData.items?.map((item: { id: string; snippet: Record<string, unknown>; statistics: Record<string, string>; contentDetails: { duration: string } }) => {
        const thumbnail = getPreferredThumbnail(item.snippet.thumbnails as Record<string, { url: string; width?: number; height?: number }>);
        const isVertical =
          typeof thumbnail.width === 'number' && typeof thumbnail.height === 'number'
            ? thumbnail.height > thumbnail.width
            : false;

        return {
          id: item.id,
          title: item.snippet.title as string,
          description: item.snippet.description as string,
          thumbnail: thumbnail.url,
          isVertical,
          publishedAt: item.snippet.publishedAt as string,
          viewCount: item.statistics.viewCount || '0',
          likeCount: item.statistics.likeCount || '0',
          commentCount: item.statistics.commentCount || '0',
          durationSeconds: parseDurationToSeconds(item.contentDetails?.duration || ''),
        };
      }) || [];

    setCachedData('latest_videos', videos);
    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export function formatNumber(num: string): string {
  const n = parseInt(num, 10);
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Bugün';
  if (diffDays === 1) return 'Dün';
  if (diffDays < 7) return `${diffDays} gün önce`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay önce`;
  return `${Math.floor(diffDays / 365)} yıl önce`;
}
