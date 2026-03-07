import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'Bobin Kardeşler nedir?',
        answer: 'Bobin Kardeşler, elektrik, elektronik ve maker projeleri üzerine eğitim videoları, blog yazıları ve topluluk etkinlikleri sunan bir platformdur.',
    },
    {
        question: 'Projelerin kaynak kodlarına nasıl ulaşabilirim?',
        answer: 'Her projenin detay sayfasında kaynak kodları ve malzeme listeleri paylaşılmaktadır. Projeler sekmesinden erişebilirsiniz.',
    },
    {
        question: 'Çekilişlere nasıl katılabilirim?',
        answer: 'Çekilişler sayfasından aktif çekilişleri görebilir ve katılım koşullarını yerine getirerek katılabilirsiniz.',
    },
    {
        question: 'Video önerisi nasıl gönderim?',
        answer: 'Video Fikirleri sayfasından önerinizi paylaşabilirsiniz. Topluluk tarafından en çok oylanan fikirler öncelikli olarak çekilir.',
    },
    {
        question: 'Bültene abone olmanın faydası nedir?',
        answer: 'Bülten aboneleri yeni video, proje ve çekiliş duyurularını herkesten önce e-posta ile alır.',
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20">
                    <HelpCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50">Sıkça Sorulan Sorular</h2>
                    <p className="text-zinc-500 text-sm">Merak ettiklerinizin cevapları</p>
                </div>
            </div>

            <div className="space-y-3">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/60 transition-all duration-300 hover:border-green-500/30"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left"
                        >
                            <span className="text-sm sm:text-base font-semibold text-zinc-100">{item.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-green-400 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
