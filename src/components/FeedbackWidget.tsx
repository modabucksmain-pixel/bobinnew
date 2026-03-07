import { useState } from 'react';
import { MessageSquare, Send, X, Star } from 'lucide-react';

export function FeedbackWidget() {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push({ rating, message, date: new Date().toISOString(), page: window.location.pathname });
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        setSubmitted(true);
        setTimeout(() => {
            setOpen(false);
            setSubmitted(false);
            setRating(0);
            setMessage('');
        }, 2000);
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-20 lg:bottom-8 left-6 z-40 w-12 h-12 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 flex items-center justify-center hover:text-green-400 hover:border-green-500/40 transition shadow-lg"
                aria-label="Geri bildirim"
            >
                <MessageSquare className="w-5 h-5" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-20 lg:bottom-8 left-6 z-40 w-80 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-zinc-100">Geri Bildirim</h3>
                <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {submitted ? (
                <div className="p-6 text-center">
                    <span className="text-4xl">🎉</span>
                    <p className="text-green-400 font-semibold mt-2">Teşekkürler!</p>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    <div>
                        <p className="text-xs text-zinc-400 mb-2">Bu sayfayı nasıl buldunuz?</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setRating(n)}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${n <= rating ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-white/5 text-zinc-500 border border-white/10'
                                        }`}
                                >
                                    <Star className="w-4 h-4" fill={n <= rating ? 'currentColor' : 'none'} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Yorumunuzu yazın..."
                        className="w-full h-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:border-green-400/60 focus:outline-none resize-none"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!rating}
                        className="w-full py-2 rounded-lg bg-green-500 text-zinc-950 text-sm font-bold hover:bg-green-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Gönder
                    </button>
                </div>
            )}
        </div>
    );
}
