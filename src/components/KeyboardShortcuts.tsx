import { useEffect } from 'react';

export function KeyboardShortcuts() {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Don't fire when typing in inputs
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

            if (e.key === '/') {
                e.preventDefault();
                window.history.pushState({}, '', '/ara');
                window.dispatchEvent(new PopStateEvent('popstate'));
            }

            if (e.key === 'h' || e.key === 'H') {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return null;
}
