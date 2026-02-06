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
    <main className="relative w-full h-screen overflow-hidden bg-[#0a0118]">
      <WelcomeScreen />
      <Universe />
      
      <Onboarding />
      <SoulModal />
      <Dashboard />
      <LiveFeed />
      <Controls />

      {/* تعليمات التحكم - محسنة للموبايل */}
      <div className="fixed bottom-4 right-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 max-w-[160px] md:max-w-xs text-xs text-gray-300 z-20">
        <p className="font-bold text-white mb-2">🎮 التحكم:</p>
        <ul className="space-y-1">
          <li>• اسحب للتحرك</li>
          <li>• Pinch للتكبير</li>
          <li>• انقر للتفاعل</li>
        </ul>
      </div>

      {/* الاسم في الخلفية - تم إصلاح التناسب هنا */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.04] w-full flex justify-center px-4 overflow-hidden">
        <h1 className="text-[15vw] md:text-[12vw] font-black text-white tracking-tighter uppercase leading-none text-center">
          LightVerse
        </h1>
      </div>
    </main>
  );
}
