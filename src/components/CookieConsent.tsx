import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookie_consent');
        if (!accepted) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-[fadeIn_0.4s_ease-out]">
            <div className="relative bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-green-500/10">
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-white transition"
                    aria-label="Kapat"
                >
                    <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                        <Cookie className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-zinc-200 font-semibold">Çerez Politikası</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Bu site deneyiminizi iyileştirmek için çerezler kullanır. Devam ederek çerez politikamızı kabul etmiş olursunuz.
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={accept}
                                className="px-4 py-2 rounded-lg bg-green-500 text-zinc-950 text-xs font-bold hover:bg-green-400 transition"
                            >
                                Kabul Et
                            </button>
                            <button
                                onClick={() => setVisible(false)}
                                className="px-4 py-2 rounded-lg border border-white/10 text-zinc-300 text-xs font-semibold hover:bg-white/5 transition"
                            >
                                Reddet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
