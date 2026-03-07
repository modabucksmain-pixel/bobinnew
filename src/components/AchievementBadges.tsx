import { Award, Flame, Zap, Star, Trophy, Target } from 'lucide-react';

const badges = [
    { icon: Flame, title: 'İlk Video', desc: 'İlk videoyu izle', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', earned: true },
    { icon: Star, title: '5 Video', desc: '5 video izle', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', earned: true },
    { icon: Zap, title: 'Hızlı Öğrenici', desc: '10 video izle', color: 'text-green-400 bg-green-500/10 border-green-500/20', earned: false },
    { icon: Trophy, title: 'Topluluk Üyesi', desc: 'Toplulukta paylaşım yap', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', earned: false },
    { icon: Target, title: 'Meydan Okuyucu', desc: 'Bir meydan okumayı tamamla', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', earned: false },
    { icon: Award, title: 'Maker Ustası', desc: '25 video izle', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20', earned: false },
];

export function AchievementBadges() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-zinc-50">Başarı Rozetleri</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {badges.map((b) => (
                    <div
                        key={b.title}
                        className={`p-4 rounded-xl border text-center transition card-lift ${b.earned ? `${b.color}` : 'bg-zinc-900/40 border-zinc-800 opacity-50 grayscale'
                            }`}
                    >
                        <b.icon className="w-8 h-8 mx-auto mb-2" />
                        <h3 className="text-xs font-bold text-zinc-100">{b.title}</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">{b.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
