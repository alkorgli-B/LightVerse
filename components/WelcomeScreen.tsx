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
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  if (!show || souls.length > 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0118] h-[100dvh] w-full overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 w-full px-4"
      >
        {/* Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            filter: ["drop-shadow(0 0 10px #fbbf24)", "drop-shadow(0 0 25px #fbbf24)", "drop-shadow(0 0 10px #fbbf24)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-16 h-16 md:w-24 md:h-24 mx-auto text-yellow-400" />
        </motion.div>

        {/* Text Area - هنا تم إصلاح التناسق */}
        <div className="space-y-3">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            // تم تصغير الخط للموبايل إلى text-4xl واستخدام tracking-tight لضمان عدم الخروج عن الإطار
            className="text-4xl md:text-7xl font-black text-white tracking-tighter sm:tracking-normal"
          >
            Light<span className="text-yellow-400">Verse</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-white/60 font-light"
          >
            عالم الأرواح المضيئة
          </motion.p>
        </div>

        {/* Loading Bar */}
        <div className="w-40 h-1 bg-white/10 rounded-full mx-auto overflow-hidden relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-yellow-400"
          />
        </div>
      </motion.div>

      {/* Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 300),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                opacity: 0
              }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_8px_#fbbf24]"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
