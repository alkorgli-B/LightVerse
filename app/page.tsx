use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import WelcomeScreen from '../components/WelcomeScreen';
import Onboarding from '../components/Onboarding';
import SoulModal from '../components/SoulModal';
import Dashboard from '../components/Dashboard';
import LiveFeed from '../components/LiveFeed';
import Controls from '../components/Controls';
import { useUniverseStore } from '../store/universeStore';

// Dynamically import Universe to avoid SSR issues with Three.js
const Universe = dynamic(() => import('../components/Universe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-cosmic-dark via-cosmic-purple to-cosmic-blue">
      <div className="spinner" />
    </div>
  ),
});

export default function Home() {
  const addSoul = useUniverseStore((state) => state.addSoul);

  // Generate demo souls on mount
  useEffect(() => {
    const colors = ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#8b5cf6', '#f3f4f6'];
    const messages = [
      'أحلم بعالم أفضل',
      'السلام للجميع',
      'الحب هو الإجابة',
      'كن التغيير',
      'أنا هنا',
      'معاً أقوى',
    ];

    // Create 20 demo souls
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
      }, i * 200); // Stagger the creation
    }
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Welcome screen */}
      <WelcomeScreen />

      {/* 3D Universe */}
      <Universe />

      {/* UI Overlays */}
      <Onboarding />
      <SoulModal />
      <Dashboard />
      <LiveFeed />
      <Controls />

      {/* Instructions */}
      <div className="fixed bottom-4 right-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 max-w-xs text-sm text-gray-300 z-20">
        <p className="font-bold text-white mb-2">🎮 التحكم:</p>
        <ul className="space-y-1 text-xs">
          <li>• اسحب بالماوس للتحرك</li>
          <li>• Scroll للتكبير/التصغير</li>
          <li>• انقر على كرة للتفاعل</li>
          <li>• Space للقفز عشوائياً</li>
        </ul>
      </div>

      {/* Branding */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-10">
        <h1 className="text-9xl font-bold text-white">
          LightVerse
        </h1>
      </div>
    </main>
  );
}