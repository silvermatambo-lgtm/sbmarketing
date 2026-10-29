import { Link } from 'react-router-dom';
import { BookOpen, Camera, Flag, CheckCircle, ArrowRight, Phone, Trophy, Tag } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import { useInView } from '../hooks/useInView';
import { useProducts } from '../hooks/useProducts';

function SectionReveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>{children}</div>;
}

export default function Home() {
  const { products, loading, error } = useProducts();
  return (
    <div className="page-enter">
      <HeroSlider />
      <div className="bg-stone-900 py-6"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[
        { icon: <Flag size={20} />, label: 'Classic Racing Heritage' }, { icon: <BookOpen size={20} />, label: 'Rare Literature' }, { icon: <Camera size={20} />, label: 'Authentic Photos' }, { icon: <Trophy size={20} />, label: 'Weekly New Items' },
      ].map((item) => <div key={item.label} className="flex items-center gap-3 text-white"><span className="text-red-500">{item.icon}</span><span className="text-sm font-medium">{item.label}</span></div>)}</div></div></div>

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionReveal className="text-center mb-10"><span className="section-tag">What We Offer</span><h2 className="section-heading text-center">Our Products & Collectables</h2><div className="gold-bar mx-auto" /><p className="text-stone-500 max-w-2xl mx-auto mt-2">Browse our current collection of classic motorsport literature and memorabilia. New items can be added by the owner every week.</p></SectionReveal>
          {loading && <p className="text-center mb-4 text-stone-600">Loading the latest collection...</p>}
          {error && <p role="alert" className="text-red-600 text-center mb-4">{error}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((mat, i) => <SectionReveal key={mat.id} delay={`delay-${(i % 3 + 1) * 100}`}><Link to="/services" className="block group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"><div className="gallery-item h-52 relative"><img src={mat.image} alt={mat.name} className="w-full h-full object-cover" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/><div className="absolute bottom-0 left-0 p-4"><span className="text-red-300 text-[10px] uppercase tracking-wider font-bold">{mat.category}</span><h3 className="text-white font-bold text-lg">{mat.name}</h3><p className="text-stone-200 text-xs mt-0.5">{mat.description}</p>{mat.price && <p className="text-white font-semibold text-sm mt-1">{mat.price}</p>}</div></div></Link></SectionReveal>)}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10"><Link to="/services" className="btn-gold">View Full Collection <ArrowRight size={16}/></Link><Link to="/sell" className="btn-outline-gold"><Tag size={16}/> Upload What You Are Selling</Link></div>
        </div>
      </section>

      <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="grid lg:grid-cols-2 gap-14 items-center"><SectionReveal className="relative"><div className="relative rounded-3xl overflow-hidden shadow-2xl"><img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&q=80" alt="Classic motorsport collectibles" className="w-full h-[420px] object-cover" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent"/></div><div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl px-6 py-4 border border-stone-100"><p className="text-red-600 font-bold text-3xl">Weekly</p><p className="text-stone-600 text-xs font-medium">New Items Added</p></div></SectionReveal><SectionReveal><span className="section-tag">Who We Are</span><h2 className="section-heading">S&B Marketing Motor Sport</h2><div className="gold-bar"/><p className="text-stone-600 leading-relaxed mb-4">We are passionate collectors and traders of classic motorsport literature and memorabilia. Based in South Africa, we buy and sell authentic posters, photographs, books, magazines and rare collectables from the golden ages of motor racing and motorcycle sport.</p><p className="text-stone-600 leading-relaxed mb-6">Every item is carefully described and photographed. New stock is added every week. Whether you are building a collection or looking to sell your own treasures, we are your trusted source.</p><ul className="space-y-3 mb-8">{['Individually numbered classic posters (A0, A1, A2)','Authentic race photographs & programmes','South African car & motorcycle magazines','Books, biographies & miscellaneous collectables'].map((item)=><li key={item} className="flex items-start gap-3 text-stone-700"><CheckCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0"/><span>{item}</span></li>)}</ul><Link to="/about" className="btn-gold">Learn More About Us <ArrowRight size={16}/></Link></SectionReveal></div></div></section>

      <section className="py-20 bg-stone-900 relative overflow-hidden"><div className="absolute inset-0 opacity-20" style={{backgroundImage:'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)',backgroundSize:'cover',backgroundPosition:'center'}}/><div className="relative max-w-4xl mx-auto px-4 text-center"><SectionReveal><h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display, serif'}}>Looking to Buy or Sell?</h2><p className="text-stone-300 mb-8 max-w-2xl mx-auto">Contact us today. We accept debit cards, credit cards and EFT. All items come with a descriptive photograph.</p><div className="flex flex-wrap justify-center gap-4"><a href="tel:0877013872" className="btn-gold"><Phone size={16}/> 087 701 3872</a><Link to="/sell" className="btn-outline-gold">Sell Your Items</Link><Link to="/contact" className="btn-outline-gold">Send an Enquiry</Link></div></SectionReveal></div></section>
    </div>
  );
}
