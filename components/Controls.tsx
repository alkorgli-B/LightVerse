import { motion } from 'framer-motion';
import { Waves, Sparkles, Moon, PartyPopper, BarChart3, Home, Plus } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

export default function Controls() {
  const mode = useUniverseStore((state) => state.mode);
  const setMode = useUniverseStore((state) => state.setMode);
  const setShowDashboard = useUniverseStore((state) => state.setShowDashboard);
  const setShowOnboarding = useUniverseStore((state) => state.setShowOnboarding);
  const mySoulId = useUniverseStore((state) => state.mySoulId);
  const souls = useUniverseStore((state) => state.souls);

  const modes = [
    { id: 'normal', name: 'عادي', icon: Home, color: 'blue' },
    { id: 'ocean', name: 'محيط', icon: Waves, color: 'cyan' },
    { id: 'galaxy', name: 'مجرة', icon: Sparkles, color: 'purple' },
    { id: 'meditation', name: 'تأمل', icon: Moon, color: 'indigo' },
    { id: 'festival', name: 'احتفال', icon: PartyPopper, color: 'pink' },
  ];

  const goToMySoul = () => {
    const mySoul = souls.find((s) => s.id === mySoulId);
    if (mySoul) {
      setShowDashboard(true);
    }
  };

  return (
    <>
      {/* Bottom control bar - تحسين الموضع للموبايل */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        // أضفنا pb-6 و bottom-6 لرفعه عن حافة المتصفح في الجوال
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-fit"
      >
        <div className="flex items-center gap-1.5 md:gap-2 p-2 md:p-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {/* Mode buttons */}
          <div className="flex items-center gap-1">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`relative p-3.5 md:p-3 rounded-full transition-all ${
                    isActive
                      ? `bg-${m.color}-500 scale-105 shadow-lg`
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {isActive && (
                    <motion.div
                      layoutId="activeModeIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {mySoulId ? (
              <button
                onClick={() => setShowDashboard(true)}
                className="p-3.5 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                <BarChart3 className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onClick={() => setShowOnboarding(true)}
                className="p-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all shadow-lg active:scale-90"
              >
                <Plus className="w-5 h-5 text-black font-bold" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Top Right - Status Bar - جعلها أصغر في الموبايل */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 right-4 z-40 flex flex-col gap-3 items-end"
      >
        {/* Counter */}
        <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-bold text-sm tracking-tighter">{souls.length}</span>
          <span className="hidden xs:inline text-gray-400 text-[10px] uppercase">روح</span>
        </div>

        {/* My Soul Button */}
        {mySoulId && (
          <button
            onClick={goToMySoul}
            className="group px-5 py-2.5 bg-yellow-400 rounded-2xl shadow-xl shadow-yellow-400/20 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <span className="text-black font-black text-xs">روحي ✨</span>
          </button>
        )}
      </motion.div>
    </>
  );
}
