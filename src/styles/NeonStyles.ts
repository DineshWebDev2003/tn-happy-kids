import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const applePulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const appleShine = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const NeonButton = styled(motion.button)`
  background: var(--apple-blue);
  border: none;
  color: var(--apple-white);
  padding: 12px 24px;
  border-radius: 20px;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    background: var(--apple-purple);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(175, 82, 222, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

export const NeonInput = styled(motion.input)`
  background: var(--apple-gray);
  border: 2px solid transparent;
  color: var(--apple-black);
  padding: 12px 20px;
  border-radius: 12px;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &::placeholder {
    color: #86868b;
  }

  &:focus {
    outline: none;
    border-color: var(--apple-blue);
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

export const NeonCard = styled(motion.div)`
  background: var(--apple-white);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${applePulse} 3s infinite;
  z-index: 1201;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--apple-blue),
      var(--apple-purple),
      var(--apple-green),
      var(--apple-yellow),
      var(--apple-red)
    );
    background-size: 200% 100%;
    animation: ${appleShine} 3s linear infinite;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 10px;
  }
`;

export const NeonTitle = styled(motion.h1)`
  font-family: 'SF Pro Display', sans-serif;
  color: var(--apple-black);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const NeonContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--apple-white);
  padding: 20px;
  position: relative;
  margin-top: 64px;
  z-index: 1200;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at top right, rgba(175, 82, 222, 0.1), transparent 50%),
      radial-gradient(circle at bottom left, rgba(0, 113, 227, 0.1), transparent 50%);
    z-index: -1;
  }
`;

export const NeonForm = styled(motion.form)`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

export const NeonDivider = styled(motion.div)`
  width: 100%;
  height: 1px;
  background: var(--apple-gray);
  margin: 20px 0;
  position: relative;

  &::before {
    content: 'or';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--apple-white);
    padding: 0 15px;
    color: #86868b;
    font-family: 'SF Pro Display', sans-serif;
    font-size: 0.9rem;
  }
`; 