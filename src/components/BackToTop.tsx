import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Başa dön"
            className="fixed bottom-20 lg:bottom-8 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-zinc-950 shadow-lg shadow-green-500/30 hover:bg-green-400 hover:scale-110 active:scale-95 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]"
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
}
