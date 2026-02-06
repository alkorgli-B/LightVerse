import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
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
    // Random position in space
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 30,
    ];

    const soul = addSoul({
      color,
      message,
      position,
      size,
      speed,
    });

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative w-full max-w-2xl mx-4 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-8 text-center border-b border-white/10">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-400 animate-pulse-glow" />
            <h1 className="text-4xl font-bold text-white mb-2">
              أنشئ روحك المضيئة
            </h1>
            <p className="text-gray-300">
              كل روح فريدة، كل ضوء له قصة
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-12 rounded-full transition-all ${
                    s <= step ? 'bg-yellow-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step 1: Color */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  1️⃣ اختر لون روحك
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {COLORS.map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setColor(c.color)}
                      className={`relative p-6 rounded-xl transition-all ${
                        color === c.color
                          ? 'ring-4 ring-yellow-400 scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: c.color,
                        boxShadow: `0 0 30px ${c.color}50`,
                      }}
                    >
                      <div className="text-4xl mb-2">{c.emoji}</div>
                      <div className="text-sm font-bold text-white">
                        {c.name}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Message */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  2️⃣ اترك رسالة للعالم
                </h2>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                  placeholder="شاركنا فكرة، حلم، أو شعور..."
                  className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  dir="rtl"
                />
                <p className="text-right text-sm text-gray-400 mt-2">
                  {message.length}/100 حرف (اختياري)
                </p>
              </motion.div>
            )}

            {/* Step 3: Size */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  3️⃣ حجم التوهج
                </h2>
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div
                    className="rounded-full transition-all"
                    style={{
                      width: `${size * 100}px`,
                      height: `${size * 100}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 ${size * 50}px ${color}`,
                    }}
                  />
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.1"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>صغير</span>
                  <span>كبير</span>
                </div>
              </motion.div>
            )}

            {/* Step 4: Speed */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  4️⃣ سرعة الحركة
                </h2>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="text-6xl">
                    {speed < 0.7 ? '🐢' : speed > 1.3 ? '🚀' : '🏃'}
                  </div>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>بطيء</span>
                  <span>سريع</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between p-8 border-t border-white/10">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                السابق
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="mr-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-all"
              >
                التالي
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="mr-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-lg transition-all flex items-center gap-2 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                إطلاق روحي في LightVerse
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}