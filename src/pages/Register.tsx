import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress } from '@mui/material';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser && name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      setSuccess('Registration successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 320, maxWidth: 400, width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#f7971e', letterSpacing: 1 }}>Join the Fun!</Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>Create your account to start learning 🚀</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
            required
            sx={{ borderRadius: 2 }}
          />
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
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
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
            sx={{ mt: 2, py: 1.2, fontWeight: 'bold', borderRadius: 2, fontSize: '1rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', boxShadow: '0 2px 8px #43cea255' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>
        <Typography sx={{ mt: 2, color: '#888' }}>
          Already have an account? <Link to="/login" style={{ color: '#f7971e', fontWeight: 'bold' }}>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register; 