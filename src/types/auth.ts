import { User as FirebaseUser } from 'firebase/auth';

export interface GameProgress {
  alphabet: number;
  math: number;
  science: number;
  safety: number;
}

export interface User extends FirebaseUser {
  isAdmin?: boolean;
  gender?: string;
  accessLevel?: 'basic' | 'premium' | 'admin';
  gameProgress?: GameProgress;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; gender?: string; photoURL?: string }) => Promise<void>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
} 