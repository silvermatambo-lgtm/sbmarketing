import { CheckCircle, Flag, BookOpen, Camera, Users } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="page-enter pt-24">
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-red-400">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">About S&B Marketing Motor Sport</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-2xl mx-auto mt-4">
            Passionate about preserving and sharing the heritage of motor racing and motorcycle sport through authentic literature and memorabilia.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&q=80"
                alt="Classic motorsport"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                loading="lazy"
              />
            </Reveal>
            <Reveal>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-heading">Dedicated to Motorsport Heritage</h2>
              <div className="gold-bar" />
              <p className="text-stone-600 leading-relaxed mb-4">
                S&B Marketing Motor Sport is your trusted South African source for classic motorsport literature and memorabilia. We buy and sell posters, photographs, books, magazines, race programmes and unique collectables that celebrate the golden ages of car and motorcycle racing.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Every item is carefully selected, described and photographed so you can buy with confidence. New stock is added every week. We accept debit cards, credit cards and EFT payments.
              </p>
              <ul className="space-y-3">
                {[
                  'Specialists in classic motor & motorcycle racing',
                  'Individually numbered posters in A0, A1 & A2',
                  'South African car and motorcycle magazines',
                  'Books, biographies and rare programmes',
                  'Friendly service for collectors and sellers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-700">
                    <CheckCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-14">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-heading text-center">What Sets Us Apart</h2>
            <div className="gold-bar mx-auto" />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Flag size={28} />, title: 'Authentic Items', desc: 'Genuine classic motorsport literature and memorabilia carefully sourced.' },
              { icon: <BookOpen size={28} />, title: 'Detailed Descriptions', desc: 'Every item comes with a descriptive photograph and relevant information.' },
              { icon: <Camera size={28} />, title: 'Weekly New Stock', desc: 'Fresh posters, photos, books and magazines added every week.' },
              { icon: <Users size={28} />, title: 'Collector Focused', desc: 'We understand collectors and treat every enquiry with care.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={`delay-${(i + 1) * 100}`}>
                <div className="bg-white rounded-2xl p-6 shadow-md h-full border border-stone-100">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
