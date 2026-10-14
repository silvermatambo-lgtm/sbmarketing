import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { getProducts } from '../data/products';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>{children}</div>;
}

const CATS = ['All', 'Posters', 'Photographs', 'Books', 'Magazines', 'Motorcycles', 'Memorabilia'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const products = getProducts();
  const filtered = filter === 'All' ? products : products.filter((g) => g.category === filter);

  return <div className="page-enter pt-24">
    <section className="relative py-20 bg-stone-900 overflow-hidden"><div className="absolute inset-0 opacity-20" style={{backgroundImage:'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)',backgroundSize:'cover',backgroundPosition:'center'}}/><div className="relative max-w-7xl mx-auto px-4 text-center"><span className="section-tag text-red-400">Current Collection</span><h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Gallery & Collection</h1><div className="gold-bar mx-auto"/><p className="text-stone-300 max-w-2xl mx-auto mt-4">Browse the latest classic motorsport literature and memorabilia. The owner can add or remove items from the collection at any time.</p></div></section>
    <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-2 mb-10">{CATS.map((c)=><button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter===c?'bg-red-600 text-white':'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>{c}</button>)}</div>
      {filtered.length === 0 ? <div className="text-center py-16 text-stone-500">No items in this category yet.</div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map((item,i)=><Reveal key={item.id} delay={`delay-${(i%3+1)*100}`}><div className="gallery-item rounded-2xl overflow-hidden shadow-md group"><div className="relative h-64"><img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy"/><div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end"><div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"><p className="text-white font-medium text-sm">{item.name}</p><span className="text-red-400 text-xs">{item.category}</span>{item.price&&<p className="text-white text-sm font-semibold mt-1">{item.price}</p>}</div></div></div></div></Reveal>)}</div>}
      <div className="text-center mt-10"><Link to="/sell" className="btn-outline-gold"><Tag size={16}/> Upload What You Are Selling</Link></div>
    </div></section>
  </div>;
}
