import React from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Chip, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideocamIcon from '@mui/icons-material/Videocam';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useLanguage } from '../components/GlobalWidgets';

const branches = [
  'Pollachi', 'Coimbatore', 'Kolathur', 'Tiruppur', 'Erode'
];

type Language = 'en' | 'ta';

type Feature = {
  icon: React.ReactNode;
  title: Record<Language, string>;
  desc: Record<Language, string>;
};

const features: Feature[] = [
  {
    icon: <VideocamIcon fontSize="large" color="primary" />, 
    title: { en: 'Live Monitoring', ta: 'நேரடி கண்காணிப்பு' },
    desc: { en: 'Parents can watch their kids live anytime!', ta: 'பெற்றோர் நேரடியாக பிள்ளைகளை காணலாம்!' }
  },
  {
    icon: <SchoolIcon fontSize="large" color="secondary" />,
    title: { en: 'Live Playschool', ta: 'நேரடி பிளேஸ்கூல்' },
    desc: { en: 'Real-time online classes for your child.', ta: 'உங்கள் பிள்ளைக்கு நேரடி ஆன்லைன் வகுப்புகள்.' }
  },
  {
    icon: <DirectionsBusIcon fontSize="large" sx={{ color: '#ff9800' }} />,
    title: { en: 'Free Cab (5km)', ta: 'இலவச கேப் (5 கிமீ)' },
    desc: { en: 'Free transportation within 5km radius.', ta: '5 கிமீ சுற்றளவில் இலவச போக்குவரத்து.' }
  },
  {
    icon: <AccountBalanceWalletIcon fontSize="large" sx={{ color: '#43c6ac' }} />,
    title: { en: "Payment Wallet", ta: "கட்டண பணப்பை" },
    desc: { en: "Deposit your kids' fees easily.", ta: "உங்கள் பிள்ளையின் கட்டணத்தை எளிதாக செலுத்துங்கள்." }
  },
  {
    icon: <SmartToyIcon fontSize="large" sx={{ color: '#a6c1ee' }} />,
    title: { en: "Robo Teacher", ta: "ரோபோ ஆசிரியர்" },
    desc: { en: "AI-powered teaching assistant for fun learning.", ta: "AI சக்தி வாய்ந்த ஆசிரியர்!" }
  },
  {
    icon: <EmojiEventsIcon fontSize="large" sx={{ color: '#ffd200' }} />,
    title: { en: "India's #1 Playschool", ta: "இந்தியாவின் #1 பிளேஸ்கூல்" },
    desc: { en: "Award-winning, trusted by thousands of parents.", ta: "விருது பெற்ற, ஆயிரக்கணக்கான பெற்றோரால் நம்பிக்கை!" }
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const typedLang = lang as Language;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            pt: 8,
            pb: 6,
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
              sx={{ 
                fontFamily: 'Comic Sans MS, Comic Sans, cursive',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {lang === 'ta' ? 'TN ஹாப்பி கிட்ஸ்' : 'TN Happy Kids!'}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              {lang === 'ta'
                ? 'இந்தியாவின் முதல் ரோபோ ஆசிரியர் பிளேஸ்கூல் குழந்தைகளுக்காக - முதன்முறையாக அறிமுகம்!'
                : "India's No. 1 Robo Teacher for Playschool – Introducing for the first time!"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                fontSize: '1.2rem', 
                py: 1.5, 
                px: 4,
                borderRadius: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                }
              }}
            >
              {lang === 'ta' ? 'இப்போது சேரவும்' : 'Join Now'}
            </Button>
          </motion.div>
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title.en}>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <Paper sx={{ p: 3, borderRadius: 4, textAlign: 'center', minHeight: 220, boxShadow: '0 4px 20px #ffd54f22', background: 'linear-gradient(135deg, #fffbe7 0%, #f8ffae 100%)' }}>
                  <Avatar sx={{ bgcolor: '#fff', width: 64, height: 64, mx: 'auto', mb: 2, boxShadow: '0 2px 8px #ffd54f55' }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
                    {feature.title[typedLang]}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.desc[typedLang]}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#43c6ac', fontWeight: 700, mb: 2 }}>
            {lang === 'ta' ? 'எங்கள் கிளைகள்' : 'Our Branches'}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {branches.map(branch => (
              <Chip
                key={branch}
                icon={<LocationOnIcon />}
                label={branch}
                color="secondary"
                sx={{ fontSize: '1.1rem', fontWeight: 700, px: 2, py: 1, m: 1, background: '#fbc2eb', color: '#a6c1ee' }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'rgba(67, 198, 172, 0.1)',
                mb: 2,
                border: '4px solid #43c6ac'
              }}
            >
              <SmartToyIcon sx={{ fontSize: 90, color: '#43c6ac' }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              {lang === 'ta' 
                ? 'இந்தியாவின் முதல் ரோபோ ஆசிரியர் பிளேஸ்கூல் குழந்தைகளுக்காக - முதன்முறையாக அறிமுகம்!'
                : "India's No. 1 Robo Teacher for Playschool – Introducing for the first time!"}
            </Typography>
            <Typography variant="body1" sx={{ color: '#888', mt: 1, fontSize: '1.2rem' }}>
              {lang === 'ta'
                ? 'உங்கள் குழந்தைகளுக்கு சிறந்த கல்வி அனுபவத்தை வழங்குங்கள்'
                : "Give your children the best educational experience"}
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 