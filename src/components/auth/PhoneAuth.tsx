import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { auth } from '../../config/firebase';

// Extend Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Cleanup recaptcha on component unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': isMobile ? 'compact' : 'normal',
        'callback': () => {
          // reCAPTCHA solved
        }
      }, auth);
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      setupRecaptcha();
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setSuccess('Verification code sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      setSuccess('Phone number verified successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            borderRadius: 2,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 2,
            borderRadius: 2,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          {success}
        </Alert>
      )}

      {!verificationId ? (
        <Box component="form" onSubmit={handleSendCode}>
          <TextField
            fullWidth
            label="Phone Number (with country code)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            margin="normal"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
          />
          <div 
            id="recaptcha-container" 
            style={{ 
              margin: '20px 0',
              display: 'flex',
              justifyContent: 'center'
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              mt: 2,
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1976d2'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Verification Code'}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              mt: 2,
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1976d2'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Verify Code'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PhoneAuth; 