import { ChevronRight, Home } from 'lucide-react';
import { Link } from './Link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-zinc-400 mb-6 flex-wrap">
            <Link href="/" className="flex items-center gap-1 hover:text-green-400 transition">
                <Home className="w-4 h-4" />
                <span>Ana Sayfa</span>
            </Link>
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-1">
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-green-400 transition">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-zinc-200 font-medium">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
