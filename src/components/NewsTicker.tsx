export function NewsTicker() {
    const items = [
        '🔥 Yeni video: Lithium pil patlama deneyi!',
        '🎉 140+ aboneye ulaştık, teşekkürler!',
        '⚡ Arduino projesi çok yakında...',
        '🎁 Yeni çekiliş duyurusu hazırlanıyor!',
        '📢 Topluluk meydan okuması başladı',
        '🔧 3D baskı ile prototip yapımı videosu yolda',
    ];

    return (
        <div className="w-full overflow-hidden bg-green-500/5 border-y border-green-500/20 py-2">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="text-sm text-green-300 font-medium mx-4">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
