export function LivePulse({ label = 'Canlı' }: { label?: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-300 text-[10px] font-bold uppercase tracking-[0.2em] border border-green-500/30">
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {label}
        </span>
    );
}
