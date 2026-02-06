import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

const COLORS = [
  { name: 'شغوف', color: '#ef4444', emoji: '🔴' },
  { name: 'هادئ', color: '#3b82f6', emoji: '🔵' },
  { name: 'متفائل', color: '#fbbf24', emoji: '💛' },
  { name: 'متوازن', color: '#10b981', emoji: '💚' },
  { name: 'حالم', color: '#8b5cf6', emoji: '💜' },
  { name: 'نقي', color: '#f3f4f6', emoji: '🤍' },
  { name: 'ناري', color: '#f97316', emoji: '🧡' },
  { name: 'عميق', color: '#06b6d4', emoji: '🩵' },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [color, setColor] = useState(COLORS[0].color);
  const [message, setMessage] = useState('');
  const [size, setSize] = useState(0.5);
  const [speed, setSpeed] = useState(1);

  const showOnboarding = useUniverseStore((state) => state.showOnboarding);
  const setShowOnboarding = useUniverseStore((state) => state.setShowOnboarding);
  const addSoul = useUniverseStore((state) => state.addSoul);
  const setMySoulId = useUniverseStore((state) => state.setMySoulId);

  const handleCreate = () => {
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 30,
    ];

    const soul = addSoul({ color, message, position, size, speed });
    setMySoulId(soul.id);
    setShowOnboarding(false);
  };

  if (!showOnboarding) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-md"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-cosmic-purple to-cosmic-dark rounded-t-[2.5rem] md:rounded-2xl shadow-2xl border-t border-white/20 h-[92vh] md:h-auto overflow-hidden flex flex-col"
        >
          {/* Handle للموبايل */}
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-4 md:hidden" />

          {/* Header */}
          <div className="p-6 md:p-8 text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
              أنشئ روحك المضيئة
            </h1>
            <div className="flex justify-center gap-1.5 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    s === step ? 'w-8 bg-yellow-400' : 'w-4 bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content - جعلناه مرن ليتناسب مع لوحة المفاتيح */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-4">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className="text-lg text-gray-400 mb-6 text-center">ما هو لون شعورك الآن؟</h2>
                <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setColor(c.color)}
                      className={`flex flex-col items-center p-4 rounded-2xl transition-all ${
                        color === c.color ? 'bg-white/20 ring-2 ring-yellow-400' : 'bg-white/5'
                      }`}
                    >
                      <span className="text-3xl mb-2">{c.emoji}</span>
                      <span className="text-xs text-white font-medium">{c.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-lg text-gray-400 mb-6 text-center">اكتب ذكرى أو رسالة</h2>
                <textarea
                  autoFocus
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                  placeholder="شاركنا ما يجول في خاطرك..."
                  className="w-full h-40 p-5 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
                  dir="rtl"
                />
                <div className="text-left mt-2 text-xs text-gray-500">{message.length}/100</div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <h2 className="text-lg text-gray-400 mb-10">اختر حجم حضورك</h2>
                <div className="flex items-center justify-center h-32 mb-10">
                  <div
                    className="rounded-full shadow-lg transition-all duration-300"
                    style={{
                      width: `${size * 120}px`,
                      height: `${size * 120}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 ${size * 60}px ${color}`,
                    }}
                  />
                </div>
                <input
                  type="range" min="0.3" max="1" step="0.1"
                  value={size} onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-yellow-400"
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <h2 className="text-lg text-gray-400 mb-10">سرعة تدفق الروح</h2>
                <div className="text-7xl mb-10 animate-float">
                  {speed < 0.7 ? '🐢' : speed > 1.3 ? '🚀' : '🏃'}
                </div>
                <input
                  type="range" min="0.5" max="2" step="0.1"
                  value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-yellow-400"
                />
              </motion.div>
            )}
          </div>

          {/* Footer - أزرار ثابتة في الأسفل */}
          <div className="p-6 md:p-8 bg-black/20 backdrop-blur-md flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-white/5 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> السابق
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-[2] py-4 bg-yellow-400 text-black rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-yellow-400/20"
              >
                التالي <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="flex-[2] py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20"
              >
                <Sparkles className="w-5 h-5" /> إطلاق الروح
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
