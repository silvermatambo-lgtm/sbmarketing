import { useState } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const SERVICES = [
  'Classic Motor Racing Posters',
  'Classic Motorcycle Racing Posters',
  'Racing Photographs',
  'Books & Biographies',
  'Magazines',
  'Memorabilia & Programmes',
  'Selling Items to You',
  'General Enquiry',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 7) e.phone = 'Valid phone required';
    if (!form.service) e.service = 'Please select a category';
    if (!form.message.trim() || form.message.length < 5) e.message = 'Please enter a message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // In production this would send to a backend or email service
    setSubmitted(true);
  };

  return (
    <div className="page-enter pt-24">
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-red-400">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Contact Us</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-2xl mx-auto mt-4">
            Whether you want to buy, sell or just ask a question — we are here to help.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact cards */}
            <div className="space-y-5">
              <Reveal>
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                      <Phone size={18} />
                    </div>
                    <h3 className="font-bold text-stone-800">Phone</h3>
                  </div>
                  <a href="tel:0877013872" className="block text-stone-600 hover:text-red-600 text-sm">087 701 3872</a>
                  <a href="tel:0844979827" className="block text-stone-600 hover:text-red-600 text-sm">084 497 9827</a>
                  <a href="tel:0736382240" className="block text-stone-600 hover:text-red-600 text-sm">073 638 2240</a>
                </div>
              </Reveal>
              <Reveal delay="delay-100">
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <h3 className="font-bold text-stone-800">Email</h3>
                  </div>
                  <a href="mailto:Sue@sbmarketing.co.za" className="text-stone-600 hover:text-red-600 text-sm">
                    Sue@sbmarketing.co.za
                  </a>
                </div>
              </Reveal>
              <Reveal delay="delay-200">
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                      <Clock size={18} />
                    </div>
                    <h3 className="font-bold text-stone-800">Hours</h3>
                  </div>
                  <p className="text-stone-600 text-sm">Mon – Fri: 08:00 – 17:00</p>
                  <p className="text-stone-600 text-sm">Sat: 09:00 – 13:00</p>
                  <p className="text-stone-500 text-xs mt-1">WhatsApp available outside hours</p>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Reveal>
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                    <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-stone-800 mb-2">Thank You!</h3>
                    <p className="text-stone-600">Your enquiry has been received. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-100 space-y-5">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">Send an Enquiry</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                          placeholder="Your name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                          placeholder="0XX XXX XXXX"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Enquiry Type *</label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm bg-white"
                        >
                          <option value="">Select...</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm resize-none"
                        placeholder="Tell us what you are looking for or what you have to sell..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" className="btn-gold w-full justify-center">
                      <Send size={16} /> Send Enquiry
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
