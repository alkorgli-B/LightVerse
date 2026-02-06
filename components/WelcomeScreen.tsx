import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';
import { useEffect, useState } from 'react';

export default function WelcomeScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const souls = useUniverseStore((state) => state.souls);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000); // زدنا الوقت قليلاً ليعيش المستخدم التجربة

    return () => clearTimeout(timer);
  }, []);

  if (!show || souls.length > 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // استخدمنا h-[100dvh] لضمان التغطية الكاملة في الموبايل
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-cosmic-dark via-cosmic-purple to-cosmic-blue h-[100dvh]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 px-6"
      >
        {/* Logo - جعلناه ينبض بشكل أوضح */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            filter: ["drop-shadow(0 0 10px #fbbf24)", "drop-shadow(0 0 30px #fbbf24)", "drop-shadow(0 0 10px #fbbf24)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-20 h-20 md:w-28 md:h-28 mx-auto text-yellow-400" />
        </motion.div>

        {/* Text Area */}
        <div className="space-y-2">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter"
          >
            LightVerse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-yellow-400/80 font-light"
          >
            عالم الأرواح المضيئة
          </motion.p>
        </div>

        {/* Loading Bar - بدلاً من النقاط، شريط تقدم يعطي إيحاء التطبيقات */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          />
        </div>
      </motion.div>

      {/* Particles - حماية window باستخدام mounted check */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0
              }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
