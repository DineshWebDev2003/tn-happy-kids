import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { 
  signInWithPhoneNumber, 
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { auth, setupRecaptchaVerifier } from 'config/firebase';

interface PhoneAuthProps {
  onSuccess?: () => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  useEffect(() => {
    // Setup reCAPTCHA when component mounts
    const verifier = setupRecaptchaVerifier('recaptcha-container');
    return () => {
      // Cleanup reCAPTCHA when component unmounts
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setStep('code');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        setupRecaptchaVerifier('recaptcha-container');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Phone Authentication
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div id="recaptcha-container" style={{ marginBottom: '1rem' }} />

      {step === 'phone' ? (
        <Box component="form" onSubmit={handleSendCode}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            margin="normal"
            required
            disabled={loading}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading || !phoneNumber}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Code'}
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleVerifyCode}>
          <TextField
            fullWidth
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading || !verificationCode}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Verify Code'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => setStep('phone')}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            Change Phone Number
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default PhoneAuth; 