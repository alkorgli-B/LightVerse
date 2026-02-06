import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Link2, Star, Calendar } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

export default function Dashboard() {
  const showDashboard = useUniverseStore((state) => state.showDashboard);
  const setShowDashboard = useUniverseStore((state) => state.setShowDashboard);
  const mySoulId = useUniverseStore((state) => state.mySoulId);
  const souls = useUniverseStore((state) => state.souls);

  const mySoul = souls.find((s) => s.id === mySoulId);

  if (!showDashboard || !mySoul) return null;

  const daysSince = Math.floor((Date.now() - mySoul.createdAt) / (1000 * 60 * 60 * 24));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowDashboard(false)}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-4"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-t-3xl md:rounded-2xl shadow-2xl border-t md:border border-white/20 overflow-hidden h-[85vh] md:h-auto max-h-[90vh] overflow-y-auto"
        >
          {/* مقبض سحب للموبايل (Visual Indicator) */}
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 md:hidden" />

          {/* Close button */}
          <button
            onClick={() => setShowDashboard(false)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Header - تحسين للموبايل */}
          <div className="p-6 md:p-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
              <div
                className="w-20 h-20 rounded-full border-2 border-white/20"
                style={{
                  backgroundColor: mySoul.color,
                  boxShadow: `0 0 40px ${mySoul.color}`,
                }}
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  💫 روحك في LightVerse
                </h1>
                <p className="text-gray-400">
                   {daysSince === 0 ? 'انضمت اليوم' : `منذ ${daysSince} يوم`}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Message */}
            {mySoul.message && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-400 text-xs mb-2">رسالتك للعالم:</p>
                <p className="text-white text-lg leading-relaxed" dir="rtl">
                  "{mySoul.message}"
                </p>
              </div>
            )}

            {/* Main Stats - شبكة مرنة */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <StatCard icon={<Zap className="text-yellow-400" />} val={mySoul.energy} label="طاقة" />
              <StatCard icon={<Link2 className="text-blue-400" />} val={mySoul.connections.length} label="اتصال" />
              <StatCard icon={<Star className="text-purple-400" />} val={mySoul.isStarred ? '1' : '0'} label="نجوم" />
              <StatCard icon={<Calendar className="text-green-400" />} val={daysSince} label="أيام" />
            </div>

            {/* Achievements - قائمة إنجازات مبسطة */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🏆 الإنجازات
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <AchievementItem 
                  done={true} 
                  title="First Light" 
                  desc="أنشئ روحك" 
                  icon="✅" 
                />
                <AchievementItem 
                  done={mySoul.energy >= 5} 
                  title="Friendly" 
                  desc={`استلم 5 طاقات (${mySoul.energy}/5)`} 
                  icon={mySoul.energy >= 5 ? "✅" : "🔒"} 
                />
              </div>
            </div>

            {/* Position Info - نسخة مخففة للموبايل */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-400 flex justify-between">
              <span>القطاع: {Math.floor(mySoul.position[0])}/{Math.floor(mySoul.position[2])}</span>
              <span>السرعة: {mySoul.speed.toFixed(1)}x</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// مكونات فرعية لتنظيف الكود وضمان استقرار الـ Build
function StatCard({ icon, val, label }: { icon: any, val: any, label: string }) {
  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <div className="text-2xl font-bold text-white">{val}</div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
    </div>
  );
}

function AchievementItem({ done, title, desc, icon }: { done: boolean, title: string, desc: string, icon: string }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${done ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10 opacity-60'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${done ? 'bg-green-500' : 'bg-gray-700'}`}>
        {icon}
      </div>
      <div>
        <div className="text-white font-bold text-sm">{title}</div>
        <div className="text-xs text-gray-400">{desc}</div>
      </div>
    </div>
  );
}
