import { useState, type ReactNode } from 'react';

interface TooltipProps {
    text: string;
    children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
    const [show, setShow] = useState(false);

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/10 text-xs text-zinc-200 whitespace-nowrap shadow-xl animate-[fadeIn_0.15s_ease-out] z-50 pointer-events-none">
                    {text}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 border-r border-b border-white/10 rotate-45 -mt-1" />
                </span>
            )}
        </span>
    );
}
