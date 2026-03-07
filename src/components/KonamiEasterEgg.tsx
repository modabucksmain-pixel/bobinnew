import { useState, useEffect } from 'react';

export function KonamiEasterEgg() {
    const [triggered, setTriggered] = useState(false);
    const [keys, setKeys] = useState<string[]>([]);
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            setKeys(prev => {
                const next = [...prev, e.key].slice(-10);
                if (next.join(',') === konami.join(',')) {
                    setTriggered(true);
                    setTimeout(() => setTriggered(false), 5000);
                }
                return next;
            });
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    if (!triggered) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" onClick={() => setTriggered(false)}>
            <div className="text-center space-y-4 animate-[scaleIn_0.5s_ease-out]">
                <div className="text-8xl">⚡</div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    Bobin Mode Aktif!
                </h2>
                <p className="text-zinc-400">Konami kodunu buldun! Gerçek bir maker'sın 🔧</p>
            </div>
        </div>
    );
}
