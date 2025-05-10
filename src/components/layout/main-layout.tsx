import type React from 'react';
import AppHeader from './app-header';
import BottomNav from './bottom-nav';
import KidoChatbot from '../kido-chatbot';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <BottomNav />
      <KidoChatbot />
    </div>
  );
};

export default MainLayout;
