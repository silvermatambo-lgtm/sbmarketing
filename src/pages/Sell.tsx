import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, MessageCircle, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '27844979827';

export default function Sell() {
  const [form, setForm] = useState({ name: '', phone: '', item: '', category: 'Magazines', details: '' });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi S&B Marketing Motor Sport, I would like to sell an item.%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AItem: ${encodeURIComponent(form.item)}%0ACategory: ${encodeURIComponent(form.category)}%0ADetails: ${encodeURIComponent(form.details)}%0A%0AI will send photos of the item on WhatsApp.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-red-600 mb-6"><ArrowLeft size={16}/> Back to website</Link>
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="bg-stone-900 px-6 py-10 text-white text-center"><Camera className="mx-auto text-red-400 mb-3" size={34}/><h1 className="text-3xl font-bold">Sell Your Motorsport Items</h1><p className="text-stone-300 text-sm mt-2 max-w-lg mx-auto">Tell us what you have. Submit the details and we will open WhatsApp so you can send photos directly to S&B Marketing Motor Sport.</p></div>
          <form onSubmit={send} className="p-6 sm:p-8 space-y-4">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-red-500" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone number" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-red-500" />
            <input required value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} placeholder="What are you selling?" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-red-500" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white"><option>Magazines</option><option>Books</option><option>Posters</option><option>Photographs</option><option>Motorcycles</option><option>Memorabilia</option><option>Other</option></select>
            <textarea required value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Edition, year, condition, quantity and any other details" rows={5} className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-red-500 resize-none" />
            <div className="bg-stone-50 rounded-2xl p-4 text-sm text-stone-600 flex gap-3"><Camera size={18} className="text-red-600 flex-shrink-0 mt-0.5"/><p>After submitting, WhatsApp will open with your details. Please attach clear photos of the items before sending.</p></div>
            <button className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"><MessageCircle size={19}/> Send Selling Enquiry on WhatsApp <Send size={16}/></button>
          </form>
        </div>
      </div>
    </div>
  );
}
