import { useState, useEffect, useRef } from 'react';

const phrases = ['Elektrik', 'Teknoloji', 'Maker', 'Underground'];

export function TypewriterText() {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const current = phrases[phraseIndex];
        const speed = isDeleting ? 50 : 100;

        timeoutRef.current = setTimeout(() => {
            if (!isDeleting) {
                setText(current.slice(0, text.length + 1));
                if (text.length + 1 === current.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setText(current.slice(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeoutRef.current);
    }, [text, isDeleting, phraseIndex]);

    return (
        <span className="text-green-400">
            {text}
            <span className="animate-pulse">|</span>
        </span>
    );
}
