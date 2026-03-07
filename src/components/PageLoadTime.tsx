import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export function PageLoadTime() {
    const [time, setTime] = useState<number | null>(null);

    useEffect(() => {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntriesByType('navigation');
            if (entries.length > 0) {
                const nav = entries[0] as PerformanceNavigationTiming;
                setTime(Math.round(nav.loadEventEnd - nav.startTime));
            }
        });
        observer.observe({ entryTypes: ['navigation'] });

        // Fallback
        setTimeout(() => {
            if (performance.timing) {
                const t = performance.timing.loadEventEnd - performance.timing.navigationStart;
                if (t > 0) setTime(t);
            }
        }, 1000);

        return () => observer.disconnect();
    }, []);

    if (!time) return null;

    return (
        <div className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
            <Zap className="w-3 h-3 text-green-500" />
            {time}ms
        </div>
    );
}
