import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const FAQS = [
  {
    q: 'What types of items do you sell?',
    a: 'We specialise in classic motor racing and motorcycle racing posters, photographs, books, biographies, magazines (including South African titles), race programmes and miscellaneous memorabilia.',
  },
  {
    q: 'What sizes are the classic posters available in?',
    a: 'Our classic motor racing posters are available in A0, A1 and A2 sizes. Each poster is individually numbered for easy ordering and includes captions and relevant information.',
  },
  {
    q: 'Do you buy as well as sell?',
    a: 'Yes. We buy quality motorsport literature and memorabilia. Contact us with details and clear photographs of the items you wish to sell and we will get back to you.',
  },
  {
    q: 'How often is new stock added?',
    a: 'New items are added every week. Follow our updates or contact us to be notified of specific categories you are interested in.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept debit cards, credit cards and EFT payments.',
  },
  {
    q: 'Will I receive a photo of the item before purchasing?',
    a: 'Yes. All items are accompanied by a descriptive photograph so you can see exactly what you are buying.',
  },
  {
    q: 'Do you ship across South Africa?',
    a: 'Yes. We can arrange delivery or collection. Shipping costs depend on size, weight and destination — please enquire for a quote.',
  },
  {
    q: 'How can I contact you?',
    a: 'Email us at Sue@sbmarketing.co.za or call/WhatsApp 087 701 3872, 084 497 9827 or 073 638 2240. You can also use the contact form on this website.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="page-enter pt-24">
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-red-400">Help</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Frequently Asked Questions</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-2xl mx-auto mt-4">
            Answers to common questions about buying and selling with S&B Marketing Motor Sport.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={`delay-${Math.min(i, 4) * 100}`}>
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-red-600 transition-transform flex-shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
