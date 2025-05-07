// src/components/games/Celebration.tsx
import React from 'react';
import Confetti from 'react-confetti';

const Celebration: React.FC = () => {
  // Make it full screen and disappear after a short time
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={200}
      recycle={false}
    />
  );
};

export default Celebration;