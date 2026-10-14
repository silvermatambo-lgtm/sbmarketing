import { Link } from 'react-router-dom';
import { Phone, Mail, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4"><img src="/logo.png" alt="S&B Marketing Motor Sport" className="h-12 w-12 object-contain" /><div><p className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>S&B Marketing</p><p className="text-red-500 text-[10px] tracking-widest uppercase">Motor Sport</p></div></div>
            <p className="text-sm leading-relaxed text-stone-400">We buy and sell classic motorsport literature and memorabilia. Your source for posters, photographs, books, magazines and collectables.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">{[{label:'Home',to:'/'},{label:'About',to:'/about'},{label:'Products',to:'/services'},{label:'Gallery',to:'/gallery'},{label:'FAQ',to:'/faq'},{label:'Testimonials',to:'/testimonials'},{label:'Contact',to:'/contact'}].map((l)=><li key={l.to}><Link to={l.to} className="hover:text-red-400 transition-colors">{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-2 text-sm text-stone-400"><li>Classic Motor Racing Posters</li><li>Motorcycle Racing Posters</li><li>Photographs</li><li>Books & Biographies</li><li>Magazines</li><li>Memorabilia & Programmes</li></ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><Phone size={16} className="text-red-500 mt-0.5 flex-shrink-0" /><div><a href="tel:0877013872" className="hover:text-red-400 block">087 701 3872</a><a href="tel:0844979827" className="hover:text-red-400 block">084 497 9827</a><a href="tel:0736382240" className="hover:text-red-400 block">073 638 2240</a></div></li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-red-500 flex-shrink-0" /><a href="mailto:Sue@sbmarketing.co.za" className="hover:text-red-400">Sue@sbmarketing.co.za</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} S&B Marketing Motor Sport. All rights reserved.</p>
          <div className="flex items-center gap-4"><Link to="/sell" className="hover:text-red-400 transition-colors">Sell Your Items</Link><Link to="/admin" className="inline-flex items-center gap-1.5 hover:text-red-400 transition-colors" title="Owner Admin"><Shield size={13}/> Owner Admin</Link></div>
        </div>
      </div>
    </footer>
  );
}
