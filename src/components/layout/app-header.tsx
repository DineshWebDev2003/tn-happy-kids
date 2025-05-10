'use client';
import Link from 'next/link';
import { SmileIcon, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const AppHeader = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <SmileIcon className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold">HappyKids Learn</h1>
        </Link>
        <div>
          {user ? (
            <Link href="/auth" title="Profile">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-accent object-cover hover:scale-105 transition-transform"
              />
            </Link>
          ) : (
            <Link href="/auth" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/80 transition-colors">
              <UserCircle2 className="w-6 h-6" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
