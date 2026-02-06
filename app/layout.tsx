
import type { Metadata, Viewport } from 'next';
import './globals.css';
import BackgroundMusic from './components/BackgroundMusic';

// إعدادات الـ Viewport لضمان تجربة الـ App ومنع التكبير العشوائي
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0118', // لون مشروعك ليتناغم مع شريط البطارية والساعة
};

export const metadata: Metadata = {
  title: 'LightVerse - عالم الأرواح المضيئة',
  description: 'عالم ثلاثي الأبعاد حيث كل روح لها ضوء وكل ضوء له قصة',
  icons: {
    icon: '/favicon.ico',
  },
  // إعدادات تجعل المتصفح يتعامل مع الموقع كتطبيق عند إضافته للشاشة الرئيسية
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LightVerse',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* وسوم إضافية لضمان عمل الـ Full Screen على أجهزة iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased overflow-hidden">
        {/* تشغيل الموسيقى في الخلفية عبر كامل التطبيق */}
        <BackgroundMusic />
        
        {children}
      </body>
    </html>
  );
}
