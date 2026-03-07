interface NewBadgeProps {
    date: string;
    daysThreshold?: number;
}

export function NewBadge({ date, daysThreshold = 3 }: NewBadgeProps) {
    const diff = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
    if (diff > daysThreshold) return null;

    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-[10px] font-bold uppercase tracking-wider border border-green-500/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Yeni
        </span>
    );
}
