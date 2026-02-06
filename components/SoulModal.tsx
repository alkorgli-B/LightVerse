import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Link2, Star, MapPin, Clock, Zap } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

export default function SoulModal() {
  const selectedSoul = useUniverseStore((state) => state.selectedSoul);
  const setSelectedSoul = useUniverseStore((state) => state.setSelectedSoul);
  const mySoulId = useUniverseStore((state) => state.mySoulId);
  const sendEnergy = useUniverseStore((state) => state.sendEnergy);
  const createConnection = useUniverseStore((state) => state.createConnection);
  const starSoul = useUniverseStore((state) => state.starSoul);

  if (!selectedSoul) return null;

  const timeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `منذ ${seconds} ثانية`;
    if (seconds < 3600) return `منذ ${Math.floor(seconds / 60)} دقيقة`;
    if (seconds < 86400) return `منذ ${Math.floor(seconds / 3600)} ساعة`;
    return `منذ ${Math.floor(seconds / 86400)} يوم`;
  };

  const handleSendEnergy = () => {
    if (mySoulId && mySoulId !== selectedSoul.id) {
      sendEnergy(mySoulId, selectedSoul.id);
    }
  };

  const handleConnect = () => {
    if (mySoulId && mySoulId !== selectedSoul.id) {
      createConnection(mySoulId, selectedSoul.id);
    }
  };

  const handleStar = () => {
    starSoul(selectedSoul.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedSoul(null)}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md mx-4 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedSoul(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Header with color */}
          <div
            className="relative h-32 flex items-center justify-center"
            style={{
              backgroundColor: selectedSoul.color,
              boxShadow: `inset 0 -50px 50px ${selectedSoul.color}40`,
            }}
          >
            <div
              className="w-20 h-20 rounded-full animate-pulse-glow"
              style={{
                backgroundColor: selectedSoul.color,
                boxShadow: `0 0 50px ${selectedSoul.color}`,
              }}
            />
            {selectedSoul.isStarred && (
              <Star className="absolute top-4 left-4 w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Clock className="w-4 h-4" />
                {timeSince(selectedSoul.createdAt)}
              </div>
              {selectedSoul.country && (
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4" />
                  {selectedSoul.country}
                </div>
              )}
            </div>

            {/* Message */}
            {selectedSoul.message && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-white text-lg" dir="rtl">
                  "{selectedSoul.message}"
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
              <div className="text-center">
                <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                <div className="text-2xl font-bold text-white">
                  {selectedSoul.energy}
                </div>
                <div className="text-xs text-gray-400">طاقة</div>
              </div>
              <div className="text-center">
                <Link2 className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                <div className="text-2xl font-bold text-white">
                  {selectedSoul.connections.length}
                </div>
                <div className="text-xs text-gray-400">اتصالات</div>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                <div className="text-2xl font-bold text-white">
                  {selectedSoul.isStarred ? '⭐' : '-'}
                </div>
                <div className="text-xs text-gray-400">نجم</div>
              </div>
            </div>

            {/* Actions */}
            {mySoulId !== selectedSoul.id && mySoulId && (
              <div className="space-y-3">
                <button
                  onClick={handleSendEnergy}
                  className="w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Heart className="w-5 h-5" />
                  أرسل طاقة
                </button>
                
                <button
                  onClick={handleConnect}
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Link2 className="w-5 h-5" />
                  رد بروحك
                </button>
                
                <button
                  onClick={handleStar}
                  className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Star className="w-5 h-5" />
                  اجعلها نجمة (1 دقيقة)
                </button>
              </div>
            )}

            {mySoulId === selectedSoul.id && (
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-center">
                <p className="text-yellow-300 font-bold">✨ هذه روحك!</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}