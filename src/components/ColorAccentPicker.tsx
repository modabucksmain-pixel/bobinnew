import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';

const accents = [
    { name: 'Yeşil', value: 'green', class: 'bg-green-500' },
    { name: 'Mavi', value: 'blue', class: 'bg-blue-500' },
    { name: 'Mor', value: 'purple', class: 'bg-purple-500' },
    { name: 'Turuncu', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pembe', value: 'pink', class: 'bg-pink-500' },
];

export function ColorAccentPicker() {
    const [open, setOpen] = useState(false);
    const [accent, setAccent] = useState('green');

    useEffect(() => {
        const saved = localStorage.getItem('accent_color');
        if (saved) setAccent(saved);
    }, []);

    const pick = (color: string) => {
        setAccent(color);
        localStorage.setItem('accent_color', color);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-green-400 transition"
                aria-label="Renk teması"
            >
                <Palette className="w-4 h-4" />
            </button>
            {open && (
                <div className="absolute top-full right-0 mt-2 p-3 rounded-xl bg-zinc-900 border border-white/10 shadow-xl flex gap-2 animate-[fadeIn_0.15s_ease-out] z-50">
                    {accents.map((a) => (
                        <button
                            key={a.value}
                            onClick={() => pick(a.value)}
                            className={`w-8 h-8 rounded-full ${a.class} ${accent === a.value ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''} transition hover:scale-110`}
                            title={a.name}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
