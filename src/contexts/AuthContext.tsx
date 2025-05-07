import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../config/firebase';
import { AuthContextType, User } from 'types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set default user role and access
        const userWithRole: User = {
          ...user,
          isAdmin: false,
          gender: '',
          // Add default access levels
          accessLevel: 'basic',
          // Add default game progress
          gameProgress: {
            alphabet: 0,
            math: 0,
            science: 0,
            safety: 0
          }
        };
        setCurrentUser(userWithRole);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Set default user role and access for Google sign-in
      const userWithRole: User = {
        ...result.user,
        isAdmin: false,
        gender: '',
        accessLevel: 'basic',
        gameProgress: {
          alphabet: 0,
          math: 0,
          science: 0,
          safety: 0
        }
      };
      setCurrentUser(userWithRole);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Set default user role and access for GitHub sign-in
      const userWithRole: User = {
        ...result.user,
        isAdmin: false,
        gender: '',
        accessLevel: 'basic',
        gameProgress: {
          alphabet: 0,
          math: 0,
          science: 0,
          safety: 0
        }
      };
      setCurrentUser(userWithRole);
    } catch (error: any) {
      console.error('Error signing in with GitHub:', error);
      throw new Error(error.message || 'Failed to sign in with GitHub');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Set default user role and access for email login
      const userWithRole: User = {
        ...result.user,
        isAdmin: false,
        gender: '',
        accessLevel: 'basic',
        gameProgress: {
          alphabet: 0,
          math: 0,
          science: 0,
          safety: 0
        }
      };
      setCurrentUser(userWithRole);
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Set default user role and access for new signup
      const userWithRole: User = {
        ...result.user,
        isAdmin: false,
        gender: '',
        accessLevel: 'basic',
        gameProgress: {
          alphabet: 0,
          math: 0,
          science: 0,
          safety: 0
        }
      };
      setCurrentUser(userWithRole);
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const updateUserProfile = async (data: { displayName?: string; gender?: string; photoURL?: string }) => {
    if (!currentUser) return;
    
    try {
      const updates: { displayName?: string; photoURL?: string } = {};
      if (data.displayName) updates.displayName = data.displayName;
      if (data.photoURL) updates.photoURL = data.photoURL;
      
      await updateProfile(currentUser, updates);
      setCurrentUser({ ...currentUser, ...data });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    login,
    signup,
    updateUserProfile,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 