import { useState } from 'react';
import { Share2, Link2, Check } from 'lucide-react';

interface ShareButtonProps {
    title?: string;
    url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* fallback */
        }
    };

    const shareToTwitter = () => {
        const text = encodeURIComponent(shareTitle);
        const link = encodeURIComponent(shareUrl);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, '_blank');
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-200 text-xs font-semibold hover:border-green-400/40 hover:text-green-300 transition"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
                {copied ? 'Kopyalandı!' : 'Link Kopyala'}
            </button>
            <button
                onClick={shareToTwitter}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-200 text-xs font-semibold hover:border-blue-400/40 hover:text-blue-300 transition"
            >
                <Share2 className="w-4 h-4" />
                Twitter
            </button>
        </div>
    );
}
