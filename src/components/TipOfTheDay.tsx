import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

const tips = [
    'Lehimleme yaparken havadarlık sağlamayı unutmayın! 🔥',
    'Arduino projelerinde pull-up direnç gerektiğini kontrol edin 📌',
    'Kondansatörler DC voltaj grubuna göre seçilmeli 🔋',
    'Breadboard bağlantılarında kısa devre riski yüksek, dikkatli olun ⚡',
    'Multimetre ile ölçüm yapmadan önce doğru aralığı seçin 📏',
    'LED\'lere mutlaka seri direnç ekleyin, yoksa yanarlar! 💡',
    'PCB tasarımında topraklama düzlemleri EMI\'yi azaltır 🛡️',
    'Voltaj regülatörlerinin soğutucu gerektirip gerektirmediğini kontrol edin 🌡️',
];

export function TipOfTheDay() {
    const [tip, setTip] = useState('');
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const dayIndex = new Date().getDate() % tips.length;
        setTip(tips[dayIndex]);
    }, []);

    if (!visible || !tip) return null;

    return (
        <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Günün İpucu</span>
                <p className="text-sm text-zinc-200">{tip}</p>
            </div>
            <button onClick={() => setVisible(false)} className="text-zinc-500 hover:text-white transition">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
