import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%);
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(67, 198, 172, 0.18);
  padding: 40px 32px 32px 32px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 0;
  background: ${({ active }) => (active ? '#43c6ac' : '#fffbe7')};
  color: ${({ active }) => (active ? '#fff' : '#43c6ac')};
  border: none;
  border-radius: 16px 16px 0 0;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
`;

const Title = styled.h2`
  color: #43c6ac;
  font-family: 'Quicksand', 'Comic Sans MS', cursive, sans-serif;
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 2px solid #ffd54f;
  font-size: 1rem;
  background: #fffbe7;
  color: #43c6ac;
  font-family: 'Quicksand', 'Comic Sans MS', cursive, sans-serif;
  &:focus {
    outline: none;
    border-color: #43c6ac;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #43c6ac 0%, #f8ffae 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background 0.2s;
`;

const ErrorMsg = styled.div`
  color: #e53935;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
`;

const SwitchText = styled.div`
  color: #43c6ac;
  font-size: 1rem;
  text-align: center;
  margin-top: 8px;
  cursor: pointer;
  text-decoration: underline;
`;

const Auth: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(email, password, displayName);
      navigate('/');
    } catch (err: any) {
      setError('Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Tabs>
          <Tab active={tab === 'login'} onClick={() => setTab('login')}>Login</Tab>
          <Tab active={tab === 'register'} onClick={() => setTab('register')}>Register</Tab>
        </Tabs>
        <Title>{tab === 'login' ? 'Welcome Back!' : 'Create Account'}</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {tab === 'login' ? (
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <Input
              type="text"
              placeholder="Full Name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
          </form>
        )}
        <SwitchText onClick={() => setTab(tab === 'login' ? 'register' : 'login')}>
          {tab === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
        </SwitchText>
      </Card>
    </Container>
  );
};

export default Auth; 