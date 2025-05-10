import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter for a slightly more child-friendly sans-serif
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import MainLayout from '@/components/layout/main-layout';
import Head from 'next/head';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'HappyKids Learn - Fun Learning Platform for Kids',
  description: 'HappyKids Learn offers interactive alphabet learning, safety education, educational games, audio stories, and AI-powered quizzes for children.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <Head>
        <link rel="icon" href="/alphabets/kido-avatar.jpg" type="image/jpeg" />
      </Head>
      <body className="font-sans antialiased">
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
