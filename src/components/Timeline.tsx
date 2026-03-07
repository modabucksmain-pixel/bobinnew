import { Clock } from 'lucide-react';

const milestones = [
    { date: '2024-01', title: 'Kanal Açıldı', desc: 'Bobin Kardeşler YouTube kanalı yayına başladı' },
    { date: '2024-03', title: '100 Abone', desc: 'İlk yüz aboneye ulaşıldı!' },
    { date: '2024-06', title: 'İlk Viral Video', desc: 'Yüksek gerilim deneyleri 10K izlenme aldı' },
    { date: '2024-09', title: '1K Abone', desc: 'Topluluk büyümeye devam ediyor' },
    { date: '2025-01', title: 'Web Sitesi Lansman', desc: 'bobinkardesler.com yayına geçti' },
    { date: '2025-06', title: '5K Abone Hedefi', desc: 'Hep birlikte büyüyoruz 🚀' },
];

export function Timeline() {
    return (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20">
                    <Clock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50">Yolculuğumuz</h2>
                    <p className="text-zinc-500 text-sm">Başlangıçtan bugüne önemli anlar</p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/40 via-green-500/20 to-transparent" />
                <div className="space-y-6">
                    {milestones.map((m, i) => (
                        <div key={i} className="relative pl-12">
                            <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-950 shadow-lg shadow-green-500/30" />
                            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:border-green-500/30 transition card-lift">
                                <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold">{m.date}</span>
                                <h3 className="text-base font-semibold text-zinc-100 mt-1">{m.title}</h3>
                                <p className="text-xs text-zinc-400 mt-1">{m.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
