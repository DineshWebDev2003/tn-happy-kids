import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setSuccess('Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 320, maxWidth: 380, width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#2196f3', letterSpacing: 1 }}>Welcome Back!</Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>Login to play and learn 🎉</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            required
            sx={{ borderRadius: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            required
            sx={{ borderRadius: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ mt: 2, py: 1.2, fontWeight: 'bold', borderRadius: 2, fontSize: '1rem', background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222', boxShadow: '0 2px 8px #ffd20055' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{ mt: 2, py: 1.2, fontWeight: 'bold', borderRadius: 2, fontSize: '1rem', background: '#fff', color: '#2196f3', border: '2px solid #2196f3', boxShadow: '0 2px 8px #2196f355' }}
          >
            Sign in with Google
          </Button>
        </Box>
        <Typography sx={{ mt: 2, color: '#888' }}>
          New here? <Link to="/register" style={{ color: '#2196f3', fontWeight: 'bold' }}>Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login; 