import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Link2, Star, Eye, Calendar, TrendingUp } from 'lucide-react';
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
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-2xl shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setShowDashboard(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  backgroundColor: mySoul.color,
                  boxShadow: `0 0 30px ${mySoul.color}`,
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  💫 روحك في LightVerse
                </h1>
                <p className="text-gray-300">
                  {mySoul.color} • {daysSince === 0 ? 'اليوم' : `${daysSince} يوم`}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-8 space-y-6">
            {/* Message */}
            {mySoul.message && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-gray-400 text-sm mb-2">رسالتك:</p>
                <p className="text-white text-lg" dir="rtl">
                  "{mySoul.message}"
                </p>
              </div>
            )}

            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-3xl font-bold text-white">{mySoul.energy}</div>
                <div className="text-sm text-gray-400">طاقة مستلمة</div>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <Link2 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold text-white">{mySoul.connections.length}</div>
                <div className="text-sm text-gray-400">اتصالات</div>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-3xl font-bold text-white">
                  {mySoul.isStarred ? '⭐' : '0'}
                </div>
                <div className="text-sm text-gray-400">نجوم</div>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-3xl font-bold text-white">{daysSince}</div>
                <div className="text-sm text-gray-400">يوم</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🏆 الإنجازات
              </h2>
              
              <div className="space-y-2">
                {/* First Light */}
                <div className="flex items-center gap-3 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold">First Light</div>
                    <div className="text-sm text-gray-300">أنشئ روحك</div>
                  </div>
                </div>

                {/* Explorer */}
                {mySoul.energy >= 5 ? (
                  <div className="flex items-center gap-3 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">Friendly</div>
                      <div className="text-sm text-gray-300">استلم 5 طاقات</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg opacity-50">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-2xl">
                      🔒
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">Friendly</div>
                      <div className="text-sm text-gray-300">استلم 5 طاقات ({mySoul.energy}/5)</div>
                    </div>
                  </div>
                )}

                {/* Social Butterfly */}
                {mySoul.connections.length >= 10 ? (
                  <div className="flex items-center gap-3 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">Social Butterfly</div>
                      <div className="text-sm text-gray-300">اتصل بـ10 أرواح</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg opacity-50">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-2xl">
                      🔒
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">Social Butterfly</div>
                      <div className="text-sm text-gray-300">اتصل بـ10 أرواح ({mySoul.connections.length}/10)</div>
                    </div>
                  </div>
                )}

                {/* Super Nova */}
                {mySoul.energy >= 100 ? (
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-2xl">
                      ⭐
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">Super Nova</div>
                      <div className="text-sm text-gray-300">اجمع 100 طاقة</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg opacity-50">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-2xl">
                      🔒
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">Super Nova</div>
                      <div className="text-sm text-gray-300">اجمع 100 طاقة ({mySoul.energy}/100)</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Position Info */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">📍 موقع روحك</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Sector: {Math.floor(mySoul.position[0])} / {Math.floor(mySoul.position[2])}</div>
                <div>الارتفاع: {Math.floor(mySoul.position[1])}</div>
                <div>الحجم: {mySoul.size.toFixed(1)}</div>
                <div>السرعة: {mySoul.speed.toFixed(1)}x</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}