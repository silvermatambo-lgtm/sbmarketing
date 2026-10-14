import { useMemo, useState } from 'react';
import { MessageCircle, X, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

type Step = 'welcome' | 'name' | 'phone' | 'service' | 'message' | 'review';

const SERVICES = [
  'Classic Motor Racing Posters',
  'Motorcycle Racing Posters',
  'Photographs',
  'Books & Biographies',
  'Magazines',
  'Memorabilia & Programmes',
  'Selling Items',
  'Other',
];
const WHATSAPP_NUMBER = '27844979827'; // 084 497 9827
const BUSINESS_NAME = 'S&B Marketing Motor Sport';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('welcome');
  const [data, setData] = useState({ name: '', phone: '', service: '', message: '' });

  const canContinue = useMemo(() => {
    if (step === 'name') return data.name.trim().length > 1;
    if (step === 'phone') return data.phone.trim().length > 6;
    if (step === 'service') return !!data.service;
    if (step === 'message') return data.message.trim().length > 2;
    return true;
  }, [step, data]);

  const next = () => {
    const order: Step[] = ['welcome','name','phone','service','message','review'];
    setStep(order[Math.min(order.indexOf(step) + 1, order.length - 1)]);
  };
  const back = () => {
    const order: Step[] = ['welcome','name','phone','service','message','review'];
    setStep(order[Math.max(order.indexOf(step) - 1, 0)]);
  };
  const sendToWhatsApp = () => {
    const text = `Hi ${BUSINESS_NAME}, I would like assistance.%0A%0AName: ${encodeURIComponent(data.name)}%0APhone: ${encodeURIComponent(data.phone)}%0AService: ${encodeURIComponent(data.service)}%0AMessage: ${encodeURIComponent(data.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-[76px] right-4 z-50 md:bottom-8">
      {open && (
        <div className="animate-chat-slide mb-3 w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
          <div className="bg-stone-900 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500"><MessageCircle size={20}/></div>
                <div><p className="font-bold">{BUSINESS_NAME}</p><p className="text-xs text-stone-300">WhatsApp Assistant • Online</p></div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/10"><X size={18}/></button>
            </div>
          </div>

          <div className="p-5 max-h-[360px] overflow-y-auto">
            {step === 'welcome' && (
              <div className="space-y-3">
                <p className="text-stone-700 text-sm">Hi! Welcome to {BUSINESS_NAME}. How can we help you today?</p>
                <p className="text-stone-500 text-xs">We'll collect a few details then open WhatsApp with your message ready to send.</p>
                <button onClick={next} className="w-full mt-2 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-semibold transition-colors">
                  Get Started
                </button>
              </div>
            )}
            {step === 'name' && (
              <div className="space-y-3">
                <p className="text-stone-700 text-sm font-medium">What's your name?</p>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:border-red-500"
                  autoFocus
                />
              </div>
            )}
            {step === 'phone' && (
              <div className="space-y-3">
                <p className="text-stone-700 text-sm font-medium">Your phone number?</p>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="0XX XXX XXXX"
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:border-red-500"
                  autoFocus
                />
              </div>
            )}
            {step === 'service' && (
              <div className="space-y-3">
                <p className="text-stone-700 text-sm font-medium">What are you interested in?</p>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setData({ ...data, service: s })}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        data.service === s ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-stone-50 hover:bg-stone-100 border border-transparent'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 'message' && (
              <div className="space-y-3">
                <p className="text-stone-700 text-sm font-medium">Any extra details?</p>
                <textarea
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                  placeholder="Tell us more about what you're looking for or selling..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:border-red-500 resize-none"
                  autoFocus
                />
              </div>
            )}
            {step === 'review' && (
              <div className="space-y-3">
                <p className="text-stone-700 text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" /> Ready to send
                </p>
                <div className="bg-stone-50 rounded-xl p-3 text-xs space-y-1 text-stone-600">
                  <p><strong>Name:</strong> {data.name}</p>
                  <p><strong>Phone:</strong> {data.phone}</p>
                  <p><strong>Interest:</strong> {data.service}</p>
                  <p><strong>Message:</strong> {data.message}</p>
                </div>
                <button
                  onClick={sendToWhatsApp}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={16} /> Open WhatsApp
                </button>
              </div>
            )}
          </div>

          {step !== 'welcome' && step !== 'review' && (
            <div className="px-5 pb-4 flex gap-2">
              <button onClick={back} className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50">
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={!canContinue}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-stone-300 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => { setOpen(!open); if (!open) setStep('welcome'); }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-400 transition-all hover:scale-105"
        aria-label="Open WhatsApp chat"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
