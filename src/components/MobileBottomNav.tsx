import { Home, Play, BookOpen, Bell, LayoutGrid } from 'lucide-react';
import { Link } from './Link';

const items = [
    { href: '/', icon: Home, label: 'Ana Sayfa' },
    { href: '/videos', icon: Play, label: 'Videolar' },
    { href: '/blog', icon: BookOpen, label: 'Blog' },
    { href: '/duyurular', icon: Bell, label: 'Duyurular' },
    { href: '/kategoriler', icon: LayoutGrid, label: 'Daha' },
];

export function MobileBottomNav() {
    const currentPath = window.location.pathname;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl safe-area-bottom">
            <div className="grid grid-cols-5 h-16">
                {items.map(({ href, icon: Icon, label }) => {
                    const active = currentPath === href || (href !== '/' && currentPath.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${active ? 'text-green-400' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
