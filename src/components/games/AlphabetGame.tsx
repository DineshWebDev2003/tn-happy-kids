import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, LinearProgress, IconButton } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { styled } from '@mui/material/styles';

const alphabetData = [
  { letter: 'A', word: 'Apple', image: '/images/apple.gif', sound: '/sounds/apple.mp3' },
  { letter: 'B', word: 'Ball', image: '/images/ball.gif', sound: '/sounds/ball.mp3' },
  { letter: 'C', word: 'Cat', image: '/images/cat.gif', sound: '/sounds/cat.mp3' },
  { letter: 'D', word: 'Dog', image: '/images/dog.gif', sound: '/sounds/dog.mp3' },
  { letter: 'E', word: 'Elephant', image: '/images/elephant.gif', sound: '/sounds/elephant.mp3' },
  { letter: 'F', word: 'Fish', image: '/images/fish.gif', sound: '/sounds/fish.mp3' },
  { letter: 'G', word: 'Goat', image: '/images/goat.gif', sound: '/sounds/goat.mp3' },
  { letter: 'H', word: 'Hat', image: '/images/hat.gif', sound: '/sounds/hat.mp3' },
  { letter: 'I', word: 'Ice', image: '/images/ice.gif', sound: '/sounds/ice.mp3' },
  { letter: 'J', word: 'Jug', image: '/images/jug.gif', sound: '/sounds/jug.mp3' },
  { letter: 'K', word: 'Kite', image: '/images/kite.gif', sound: '/sounds/kite.mp3' },
  { letter: 'L', word: 'Lion', image: '/images/lion.gif', sound: '/sounds/lion.mp3' },
  { letter: 'M', word: 'Monkey', image: '/images/monkey.gif', sound: '/sounds/monkey.mp3' },
  { letter: 'N', word: 'Nest', image: '/images/nest.gif', sound: '/sounds/nest.mp3' },
  { letter: 'O', word: 'Orange', image: '/images/orange.gif', sound: '/sounds/orange.mp3' },
  { letter: 'P', word: 'Penguin', image: '/images/penguin.gif', sound: '/sounds/penguin.mp3' },
  { letter: 'Q', word: 'Queen', image: '/images/queen.gif', sound: '/sounds/queen.mp3' },
  { letter: 'R', word: 'Rabbit', image: '/images/rabbit.gif', sound: '/sounds/rabbit.mp3' },
  { letter: 'S', word: 'Sun', image: '/images/sun.gif', sound: '/sounds/sun.mp3' },
  { letter: 'T', word: 'Tiger', image: '/images/tiger.gif', sound: '/sounds/tiger.mp3' },
  { letter: 'U', word: 'Umbrella', image: '/images/umbrella.gif', sound: '/sounds/umbrella.mp3' },
  { letter: 'V', word: 'Violin', image: '/images/violin.gif', sound: '/sounds/violin.mp3' },
  { letter: 'W', word: 'Whale', image: '/images/whale.gif', sound: '/sounds/whale.mp3' },
  { letter: 'X', word: 'Xylophone', image: '/images/xylophone.gif', sound: '/sounds/xylophone.mp3' },
  { letter: 'Y', word: 'Yarn', image: '/images/yarn.gif', sound: '/sounds/yarn.mp3' },
  { letter: 'Z', word: 'Zebra', image: '/images/zebra.gif', sound: '/sounds/zebra.mp3' }
];

const GameContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)',
  padding: '24px 8px',
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  maxWidth: 420,
  width: '100%',
  borderRadius: 32,
  boxShadow: '0 8px 32px rgba(67,198,172,0.18)',
  padding: '32px 20px 24px 20px',
  background: '#fffbe7',
  textAlign: 'center',
  position: 'relative',
}));

const LetterButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  minHeight: 0,
  width: 64,
  height: 64,
  borderRadius: '50%',
  fontSize: '2rem',
  fontWeight: 700,
  margin: 8,
  background: 'linear-gradient(135deg, #a6c1ee 0%, #43c6ac 100%)',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(67,198,172,0.12)',
  transition: 'transform 0.15s',
  '&:hover': {
    background: 'linear-gradient(135deg, #43c6ac 0%, #a6c1ee 100%)',
    transform: 'scale(1.08)',
  },
}));

const WordText = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: '#43c6ac',
  margin: '12px 0 8px 0',
}));

function getRandomDistractor(correctIdx: number) {
  let idx = Math.floor(Math.random() * alphabetData.length);
  while (idx === correctIdx) {
    idx = Math.floor(Math.random() * alphabetData.length);
  }
  return alphabetData[idx];
}

const playWrongSound = () => {
  const audio = new Audio('/sounds/wrong.mp3');
  audio.play();
};

const playRightSound = () => {
  const audio = new Audio('/sounds/right.mp3');
  audio.play();
};

const speakWord = (text: string) => {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    const preferredVoice = voices.find(v => v.name.toLowerCase().includes('female') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('microsoft')))
      || voices.find(v => v.name.toLowerCase().includes('female'))
      || voices[0];
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.pitch = 1.2;
    utter.rate = 0.9;
    utter.lang = 'en-US';
    if (preferredVoice) utter.voice = preferredVoice;
    synth.speak(utter);
  }
};

const AlphabetGame: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<'teach' | 'quiz'>('teach');
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrong, setWrong] = useState(false);

  const handleNext = () => {
    setShowCelebration(false);
    setWrong(false);
    setStep('teach');
    setCurrent((prev) => (prev + 1) % alphabetData.length);
  };

  const handlePlaySound = () => {
    const soundFile = alphabetData[current].sound;
    if (soundFile) {
      fetch(soundFile, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            const audio = new Audio(soundFile);
            audio.play();
          } else {
            speakWord(`${alphabetData[current].letter} is for ${alphabetData[current].word}`);
          }
        })
        .catch(() => {
          speakWord(`${alphabetData[current].letter} is for ${alphabetData[current].word}`);
        });
    } else {
      speakWord(`${alphabetData[current].letter} is for ${alphabetData[current].word}`);
    }
  };

  const handleQuiz = () => {
    setStep('quiz');
    setWrong(false);
  };

  const handleImageClick = (idx: number) => {
    if (idx === 0) {
      playRightSound();
      setShowCelebration(true);
      setTimeout(() => {
        handleNext();
      }, 1200);
    } else {
      setWrong(true);
      playWrongSound();
      setTimeout(() => setWrong(false), 700);
    }
  };

  const progress = ((current + 1) / alphabetData.length) * 100;
  const correct = alphabetData[current];
  const distractor = getRandomDistractor(current);
  const quizOptions = [correct, distractor].sort(() => Math.random() - 0.5);

  return (
    <GameContainer>
      <StyledCard elevation={6}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <EmojiEmotionsIcon sx={{ fontSize: 36, color: '#ffd54f', mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="#43c6ac">
            Alphabet Adventure
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, mb: 2, background: '#f8ffae' }} />
        {step === 'teach' && (
          <>
            <img
              src={correct.image}
              alt={correct.word}
              style={{ width: 120, height: 120, objectFit: 'contain', margin: '0 auto', borderRadius: 16, background: '#fff', boxShadow: '0 2px 8px #a6c1ee33' }}
            />
            <WordText gutterBottom>
              {correct.letter} is for <b>{correct.word}</b>
            </WordText>
            <IconButton onClick={handlePlaySound} color="primary" sx={{ mb: 1 }}>
              <VolumeUpIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', px: 4, py: 1.5, background: 'linear-gradient(135deg, #43c6ac 0%, #a6c1ee 100%)' }}
              onClick={handleQuiz}
            >
              Next
            </Button>
          </>
        )}
        {step === 'quiz' && (
          <>
            <Typography variant="h6" color="#43c6ac" fontWeight={600} mb={2}>
              Which one is <b>{correct.word}</b>?
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
              {quizOptions.map((item, idx) => (
                <Grid item xs={6} key={item.letter}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 1,
                      borderRadius: 4,
                      background: wrong && idx !== 0 ? '#ffebee' : '#fff',
                      boxShadow: wrong && idx !== 0 ? '0 0 8px 2px #ff1744' : '0 2px 8px #a6c1ee33',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: idx === 0 && showCelebration ? '2px solid #ffd54f' : undefined,
                      transform: wrong && idx !== 0 ? 'scale(0.95) rotate(-2deg)' : undefined,
                    }}
                    onClick={() => handleImageClick(quizOptions.indexOf(item))}
                  >
                    <img
                      src={item.image}
                      alt={item.word}
                      style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 8, background: '#fff' }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {showCelebration && (
              <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                <CelebrationIcon sx={{ fontSize: 48, color: '#ffd54f', mb: 1 }} />
                <Typography variant="h6" color="#43c6ac" fontWeight={700}>
                  Great job!
                </Typography>
              </Box>
            )}
          </>
        )}
      </StyledCard>
    </GameContainer>
  );
};

export default AlphabetGame; 