import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useProducts } from '../hooks/useProducts';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const SERVICES = [
  {
    title: 'Classic Motor Racing Posters',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    desc: 'Each poster is individually numbered for easy ordering. Captions and relevant information are included. Available in A0, A1 and A2 sizes. Perfect for collectors and enthusiasts of the golden eras of motor racing.',
    features: ['Individually numbered', 'A0, A1 & A2 sizes', 'Captions & info included', 'Descriptive photograph with every item'],
  },
  {
    title: 'Classic Motorcycle Racing Posters',
    img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&q=80',
    desc: 'Celebrate the history of motorcycle racing with our carefully selected classic posters. From historic Grand Prix machines to iconic riders, these pieces capture the spirit of two-wheeled competition.',
    features: ['Rare & classic designs', 'High-quality prints', 'Suitable for framing', 'New stock added weekly'],
  },
  {
    title: 'Classic Motor Racing Photographs',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=80',
    desc: 'Authentic photographs from classic motor racing events. Capture the action, the cars and the atmosphere of bygone eras. Ideal for collectors and as unique gifts.',
    features: ['Authentic race images', 'Various eras & series', 'High-resolution options', 'Accompanied by description'],
  },
  {
    title: 'Classic Motorcycle Racing Photographs',
    img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80',
    desc: 'Stunning photographs of classic motorcycle racing. From trackside action to iconic machines and riders that defined motorcycle sport history.',
    features: ['Trackside & portrait shots', 'Historic machines', 'Collectible quality', 'Detailed captions'],
  },
  {
    title: 'Motor Racing Books & Biographies',
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=80',
    desc: 'A carefully curated selection of motor racing books and biographies. From technical histories to driver stories — expand your library with titles that matter to true enthusiasts.',
    features: ['Driver biographies', 'Technical & history titles', 'Rare & out-of-print finds', 'Condition carefully graded'],
  },
  {
    title: 'Motorcycle Racing Books & Biographies',
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=80',
    desc: 'Books and biographies focused on motorcycle racing legends, machines and events. Essential reading for any serious motorcycle sport collector.',
    features: ['Rider biographies', 'Machine histories', 'Event chronicles', 'International & SA titles'],
  },
  {
    title: 'Motor Racing & Motorcycle Magazines',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
    desc: 'South African and international motor racing and motorcycle magazines. Complete your collection with issues covering local and global events, tests and features.',
    features: ['SA Car & Bike magazines', 'International titles', 'Back issues available', 'Condition noted'],
  },
  {
    title: 'Memorabilia, Programmes & More',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80',
    desc: 'Race programmes, miscellaneous books, photographs and unique memorabilia. Every item is photographed and described so you know exactly what you are buying.',
    features: ['Race programmes', 'Miscellaneous collectables', 'Motoring & motorcycle books', 'Weekly new arrivals'],
  },
];

export default function Services() {
  const { products, loading, error } = useProducts();
  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-red-400">What We Offer</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Our Products & Collectables</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-2xl mx-auto mt-4">
            We buy and sell classic motorsport literature, posters, photographs, books, magazines and memorabilia. New items added every week.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i % 2 === 0 ? '' : 'delay-100'}>
              <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img src={svc.img} alt={svc.title} className="w-full h-72 object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {svc.title}
                  </h2>
                  <div className="gold-bar" />
                  <p className="text-stone-600 leading-relaxed mb-6">{svc.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-stone-700">
                        <CheckCircle size={16} className="text-red-600 flex-shrink-0" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-gold">
                    Enquire About This <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Current Collection</h2>
          <p className="text-stone-600 mb-8">Browse the latest available items.</p>
          {loading && <p className="mb-5">Loading latest products...</p>}
          {error && <p role="alert" className="text-red-600 mb-5">{error}</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p=><article key={p.id} className="rounded-2xl bg-white overflow-hidden shadow-md">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-5"><span className="text-red-600 text-xs font-bold uppercase">{p.category}</span><h3 className="font-bold text-lg mt-1">{p.name}</h3><p className="text-stone-600 text-sm mt-2">{p.description}</p>
                {p.price && <p className="text-red-600 font-semibold mt-2">{p.price}</p>}
                <Link to="/contact" className="inline-flex items-center gap-1 mt-4 text-red-600 font-semibold">Enquire <ArrowRight size={15}/></Link>
              </div></article>)}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">Have Items to Sell?</h2>
          <p className="text-stone-600 mb-6">We buy quality motorsport literature and memorabilia. Contact us with details and photos of what you have.</p>
          <Link to="/contact" className="btn-gold">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
