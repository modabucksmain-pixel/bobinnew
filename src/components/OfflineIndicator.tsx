import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
    const [offline, setOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const goOffline = () => setOffline(true);
        const goOnline = () => setOffline(false);
        window.addEventListener('offline', goOffline);
        window.addEventListener('online', goOnline);
        return () => {
            window.removeEventListener('offline', goOffline);
            window.removeEventListener('online', goOnline);
        };
    }, []);

    if (!offline) return null;

    return (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-full bg-red-500/90 text-white text-xs font-bold flex items-center gap-2 shadow-lg animate-[fadeIn_0.3s_ease-out]">
            <WifiOff className="w-4 h-4" />
            Çevrimdışı
        </div>
    );
}
