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
      // This would ideally move the camera to the soul's position
      // For now, we'll just open the dashboard
      setShowDashboard(true);
    }
  };

  return (
    <>
      {/* Bottom control bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex items-center gap-2 p-3 bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
          {/* Mode buttons */}
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`relative p-3 rounded-full transition-all ${
                  isActive
                    ? `bg-${m.color}-500 scale-110 shadow-lg`
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                title={m.name}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {isActive && (
                  <motion.div
                    layoutId="activeMode"
                    className={`absolute inset-0 bg-${m.color}-500/20 rounded-full`}
                    style={{ boxShadow: `0 0 20px var(--tw-${m.color}-500)` }}
                  />
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 bg-white/20 mx-2" />

          {/* Dashboard button */}
          {mySoulId && (
            <button
              onClick={() => setShowDashboard(true)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              title="إحصائياتي"
            >
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </button>
          )}

          {/* Add soul button */}
          {!mySoulId && (
            <button
              onClick={() => setShowOnboarding(true)}
              className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-full transition-all shadow-lg"
              title="أضف روحك"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Top stats bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-30"
      >
        <div className="flex flex-col gap-2">
          {/* Total souls */}
          <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-bold">{souls.length}</span>
              <span className="text-gray-400 text-sm">روح حية</span>
            </div>
          </div>

          {/* My soul button */}
          {mySoulId && (
            <button
              onClick={goToMySoul}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-full border border-white/10 shadow-lg transition-all"
            >
              <span className="text-white font-bold text-sm">✨ روحي</span>
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}