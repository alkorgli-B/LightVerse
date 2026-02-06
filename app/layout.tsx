import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LightVerse - عالم الأرواح المضيئة',
  description: 'عالم ثلاثي الأبعاد حيث كل روح لها ضوء وكل ضوء له قصة',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}