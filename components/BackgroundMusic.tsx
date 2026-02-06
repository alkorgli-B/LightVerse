"use client";
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  // استخدام useRef للتحكم في عنصر الصوت بدون إعادة ريندر
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // المتصفح قد يمنع التشغيل التلقائي حتى يحدث تفاعل
          console.log("بانتظار تفاعل المستخدم لتشغيل الموسيقى...");
        });
      }
    };

    // محاولة التشغيل عند أول ضغطة للمستخدم في أي مكان
    window.addEventListener('click', playAudio, { once: true });
    window.addEventListener('touchstart', playAudio, { once: true });

    return () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop // لضمان عدم توقف الموسيقى أبداً
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // يمكنك استبدال الرابط برابط موسيقى هادئة خاص بك
      preload="auto"
    />
  );
}
