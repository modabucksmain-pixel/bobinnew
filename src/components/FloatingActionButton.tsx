import { useState, useEffect } from 'react';
import { Plus, Home, Play, BookOpen, MessageSquare, X } from 'lucide-react';
import { Link } from './Link';

const actions = [
    { href: '/', icon: Home, label: 'Ana Sayfa', color: 'bg-green-500' },
    { href: '/videos', icon: Play, label: 'Videolar', color: 'bg-blue-500' },
    { href: '/blog', icon: BookOpen, label: 'Blog', color: 'bg-purple-500' },
    { href: '/topluluk', icon: MessageSquare, label: 'Topluluk', color: 'bg-amber-500' },
];

export function FloatingActionButton() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            const close = () => setOpen(false);
            document.addEventListener('click', close, { once: true });
        }
    }, [open]);

    return (
        <div className="fixed bottom-20 lg:bottom-24 right-6 z-40 hidden lg:flex flex-col items-end gap-2">
            {open && (
                <div className="flex flex-col gap-2 animate-[fadeIn_0.2s_ease-out]">
                    {actions.map((a) => (
                        <Link
                            key={a.href}
                            href={a.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-200 text-sm font-semibold hover:border-green-500/40 transition shadow-lg"
                        >
                            <div className={`w-8 h-8 ${a.color} rounded-full flex items-center justify-center text-white`}>
                                <a.icon className="w-4 h-4" />
                            </div>
                            {a.label}
                        </Link>
                    ))}
                </div>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                className={`w-14 h-14 rounded-full bg-green-500 text-zinc-950 flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-400 transition-all duration-300 ${open ? 'rotate-45' : ''}`}
            >
                {open ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </button>
        </div>
    );
}
