import { useState } from 'react';
import { useInView } from '../hooks/useInView';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Classic motor racing poster', cat: 'Posters' },
  { src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', alt: 'Vintage race car', cat: 'Photographs' },
  { src: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80', alt: 'Classic motorcycle', cat: 'Motorcycles' },
  { src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80', alt: 'Racing books', cat: 'Books' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Magazines collection', cat: 'Magazines' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80', alt: 'Racing memorabilia', cat: 'Memorabilia' },
  { src: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80', alt: 'Motorcycle racing', cat: 'Motorcycles' },
  { src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80', alt: 'Classic books', cat: 'Books' },
  { src: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&q=80', alt: 'Classic car detail', cat: 'Photographs' },
];

const CATS = ['All', 'Posters', 'Photographs', 'Books', 'Magazines', 'Motorcycles', 'Memorabilia'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === filter);

  return (
    <div className="page-enter pt-24">
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-red-400">Inspiration</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Gallery</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-2xl mx-auto mt-4">
            A selection of the types of classic motorsport literature and memorabilia we deal in.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <Reveal key={item.src + i} delay={`delay-${(i % 3 + 1) * 100}`}>
                <div className="gallery-item rounded-2xl overflow-hidden shadow-md group">
                  <div className="relative h-64">
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                      <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white font-medium text-sm">{item.alt}</p>
                        <span className="text-red-400 text-xs">{item.cat}</span>
                      </div>
                    </div>
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
