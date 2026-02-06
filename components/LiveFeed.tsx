import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Link2, Star, Sparkles } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';
import { useEffect, useState } from 'react';

interface FeedItem {
  id: string;
  type: 'soul' | 'energy' | 'connection' | 'star';
  message: string;
  timestamp: number;
}

export default function LiveFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const souls = useUniverseStore((state) => state.souls);
  const totalInteractions = useUniverseStore((state) => state.totalInteractions);

  // Add feed items when interactions happen
  useEffect(() => {
    if (totalInteractions > 0) {
      const newItem: FeedItem = {
        id: Math.random().toString(),
        type: 'energy',
        message: 'تم إرسال طاقة جديدة',
        timestamp: Date.now(),
      };
      
      setFeed((prev) => [newItem, ...prev].slice(0, 5));
    }
  }, [totalInteractions]);

  // Add feed items when new souls are created
  useEffect(() => {
    if (souls.length > 0) {
      const latestSoul = souls[souls.length - 1];
      if (Date.now() - latestSoul.createdAt < 5000) {
        const newItem: FeedItem = {
          id: latestSoul.id,
          type: 'soul',
          message: 'روح جديدة ولدت',
          timestamp: latestSoul.createdAt,
        };
        
        setFeed((prev) => [newItem, ...prev].slice(0, 5));
      }
    }
  }, [souls.length]);

  const getIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'soul':
        return <Sparkles className="w-4 h-4" />;
      case 'energy':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'connection':
        return <Link2 className="w-4 h-4 text-blue-400" />;
      case 'star':
        return <Star className="w-4 h-4 text-purple-400" />;
    }
  };

  const timeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `منذ ${seconds} ثانية`;
    if (seconds < 120) return 'منذ دقيقة';
    return `منذ ${Math.floor(seconds / 60)} دقيقة`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 w-64 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl z-30"
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10 bg-red-500/20">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-white font-bold text-sm">LIVE</span>
      </div>

      {/* Feed Items */}
      <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {feed.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-start gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="mt-0.5">{getIcon(item.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">{item.message}</p>
                <p className="text-gray-400 text-xs">{timeSince(item.timestamp)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {feed.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            لا توجد تحديثات حالياً
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">الأرواح الحية:</span>
          <span className="text-white font-bold">{souls.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">التفاعلات اليوم:</span>
          <span className="text-white font-bold">{totalInteractions}</span>
        </div>
      </div>
    </motion.div>
  );
}