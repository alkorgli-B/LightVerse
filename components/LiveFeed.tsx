import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Link2, Star, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false); // للتحكم في القائمة في الموبايل
  const souls = useUniverseStore((state) => state.souls);
  const totalInteractions = useUniverseStore((state) => state.totalInteractions);

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
      case 'soul': return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'energy': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'connection': return <Link2 className="w-4 h-4 text-blue-400" />;
      case 'star': return <Star className="w-4 h-4 text-purple-400" />;
    }
  };

  const timeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `منذ ${seconds} ثانية`;
    return `منذ دقيقة`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-4 left-4 z-40 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-48 md:w-64'
      }`}
    >
      <div className="bg-black/60 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Header - قابل للنقر في الموبايل */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-3 md:p-4 border-b border-white/10 bg-red-500/10 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-bold text-[10px] md:text-sm">LIVE FEED</span>
          </div>
          <div className="md:hidden">
            {isOpen ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
          </div>
        </div>

        {/* Feed Items - يختفي في الموبايل إلا إذا تم فتحه */}
        <div className={`${isOpen ? 'block' : 'hidden md:block'} p-3 space-y-2 max-h-60 overflow-y-auto`}>
          <AnimatePresence>
            {feed.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 p-2 bg-white/5 rounded-xl border border-white/5"
              >
                <div className="mt-0.5">{getIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[11px] leading-tight">{item.message}</p>
                  <p className="text-gray-500 text-[9px]">{timeSince(item.timestamp)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {feed.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-[10px]">لا تحديثات</div>
          )}
        </div>

        {/* Quick Stats - دائماً مرئي بشكل أنيق */}
        <div className="px-4 py-2 bg-white/5 flex justify-between items-center md:block">
           <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">الأرواح:</span>
              <span className="text-xs text-white font-bold">{souls.length}</span>
           </div>
           <div className="flex items-center gap-2 md:mt-1">
              <span className="text-[10px] text-gray-400">التفاعلات:</span>
              <span className="text-xs text-white font-bold">{totalInteractions}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
