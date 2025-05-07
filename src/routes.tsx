import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import Learning from './pages/Learning';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import GameSelection from './components/GameSelection';
import AlphabetGame from './components/games/AlphabetGame';
import MathGame from './components/games/MathGame';
import WordGame from './components/games/WordGame';
import ScienceGame from './components/games/ScienceGame';
import HistoryGame from './components/games/HistoryGame';
import Geography from './components/games/Geography';
import SafetyGame from './components/games/SafetyGame';
import StoryGame from './components/games/StoryGame';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Stories from './pages/Stories';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Auth routes removed, add new Auth page/component here if needed */}
        <Route path="/" element={<Home />} />
        
        {/* Basic Game Routes (Public) */}
        <Route path="/games" element={<Games />} />
        <Route path="/games/alphabet" element={<AlphabetGame />} />
        <Route path="/games/math" element={<MathGame />} />
        <Route path="/games/safety" element={<SafetyGame />} />
        
        {/* Protected Routes */}
        <Route path="/learning" element={<PrivateRoute><Learning /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        {/* Premium Game Routes (Protected) */}
        <Route path="/games/story" element={<PrivateRoute><StoryGame /></PrivateRoute>} />
        <Route path="/games/word" element={<PrivateRoute><WordGame /></PrivateRoute>} />
        <Route path="/games/science" element={<PrivateRoute><ScienceGame /></PrivateRoute>} />
        <Route path="/games/history" element={<PrivateRoute><HistoryGame /></PrivateRoute>} />
        <Route path="/games/geography" element={<PrivateRoute><Geography /></PrivateRoute>} />
        
        {/* Stories Route */}
        <Route path="/stories" element={<Stories />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes; 