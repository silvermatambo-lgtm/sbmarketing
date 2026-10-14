import { Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const TESTIMONIALS = [
  {
    name: 'Johan van der Berg',
    role: 'Collector, Gauteng',
    text: 'Found several rare South African motorcycle magazines I had been searching for years. Excellent communication and the items arrived exactly as described.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    role: 'Motorsport Enthusiast, Cape Town',
    text: 'Bought a classic motor racing poster set. Numbered, well packaged and the quality is superb. Will definitely buy again.',
    rating: 5,
  },
  {
    name: 'Pieter Botha',
    role: 'Private Seller, KwaZulu-Natal',
    text: 'Sold a collection of old race programmes through S&B. Fair offer and smooth process. Highly recommended if you have items to sell.',
    rating: 5,
  },
  {
    name: 'Thabo Nkosi',
    role: 'Collector, Johannesburg',
    text: 'Great selection of books and photographs. New stock appears regularly and the descriptions with photos make buying online easy.',
    rating: 5,
  },
  {
    name: 'Linda Kruger',
    role: 'Gift Buyer, Pretoria',
    text: 'Purchased a motorcycle racing biography as a gift. Fast response and the item was in perfect condition. Thank you!',
    rating: 5,
  },
  {
    name: 'Chris Adams',
    role: 'Racing Historian, Durban',
    text: 'Reliable source for authentic memorabilia. Appreciate the weekly updates and the care taken with each listing.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="page-enter pt-24">
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-red-400">Feedback</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">What Collectors Say</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-2xl mx-auto mt-4">
            Feedback from collectors and sellers who have dealt with S&B Marketing Motor Sport.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={`delay-${(i % 3 + 1) * 100}`}>
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-red-500 text-red-500" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-stone-800 text-sm">{t.name}</p>
                    <p className="text-stone-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
