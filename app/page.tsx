"use client";
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useUniverseStore } from '../store/universeStore';

// 1. استيراد المكونات ديناميكياً لضمان عدم تشغيلها في السيرفر
const Universe = dynamic(() => import('../components/Universe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="spinner" />
    </div>
  ),
});

const WelcomeScreen = dynamic(() => import('../components/WelcomeScreen'), { ssr: false });
const Onboarding = dynamic(() => import('../components/Onboarding'), { ssr: false });
const SoulModal = dynamic(() => import('../components/SoulModal'), { ssr: false });
const Dashboard = dynamic(() => import('../components/Dashboard'), { ssr: false });
const LiveFeed = dynamic(() => import('../components/LiveFeed'), { ssr: false });
const Controls = dynamic(() => import('../components/Controls'), { ssr: false });

export default function Home() {
  const addSoul = useUniverseStore((state) => state.addSoul);

  useEffect(() => {
    // حماية إضافية للتأكد من أننا في المتصفح قبل تشغيل التايمر
    if (typeof window === 'undefined') return;

    const colors = ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#8b5cf6', '#f3f4f6'];
    const messages = ['أحلم بعالم أفضل', 'السلام للجميع', 'الحب هو الإجابة', 'كن التغيير', 'أنا هنا', 'معاً أقوى'];

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        addSoul({
          color: colors[Math.floor(Math.random() * colors.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          position: [
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 30,
          ],
          size: 0.3 + Math.random() * 0.5,
          speed: 0.5 + Math.random() * 1.5,
        });
      }, i * 200);
    }
  }, [addSoul]);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <WelcomeScreen />
      <Universe />
      
      <Onboarding />
      <SoulModal />
      <Dashboard />
      <LiveFeed />
      <Controls />

      <div className="fixed bottom-4 right-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 max-w-xs text-sm text-gray-300 z-20">
        <p className="font-bold text-white mb-2">🎮 التحكم:</p>
        <ul className="space-y-1 text-xs">
          <li>• اسحب بالماوس للتحرك</li>
          <li>• Scroll للتكبير/التصغير</li>
          <li>• انقر على كرة للتفاعل</li>
          <li>• Space للقفز عشوائياً</li>
        </ul>
      </div>

<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.03] overflow-hidden w-full flex justify-center">
  <h1 className="text-[18vw] md:text-[12vw] font-black text-white tracking-tighter uppercase leading-none">
    LightVerse
  </h1>
</div>
