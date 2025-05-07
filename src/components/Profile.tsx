import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { useAuth } from 'contexts/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'config/firebase';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock progress data - replace with real data from your database
  const progressData = {
    alphabet: 75,
    math: 60,
    science: 45,
    safety: 90
  };

  const achievements = [
    { title: 'Alphabet Master', description: 'Completed all alphabet lessons', icon: <TrophyIcon /> },
    { title: 'Math Whiz', description: 'Solved 50 math problems', icon: <SchoolIcon /> },
    { title: 'Safety Expert', description: 'Completed safety course', icon: <StarIcon /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserProfile({ displayName, gender });
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // First upload the file to Firebase Storage
      const storageRef = ref(storage, `profile_photos/${currentUser?.uid}`);
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const photoURL = await getDownloadURL(storageRef);
      
      // Update the user's profile with the new photo URL
      await updateUserProfile({ photoURL });
      setSuccess('Profile picture updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={currentUser?.photoURL || undefined}
              alt={currentUser?.displayName || 'User'}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {currentUser?.displayName || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email || 'No email provided'}
            </Typography>
          </Paper>
        </Grid>

        {/* Progress Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Learning Progress
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Alphabet Learning
              </Typography>
              <LinearProgress variant="determinate" value={progressData.alphabet} sx={{ mb: 2 }} />
              
              <Typography variant="body2" gutterBottom>
                Math Skills
              </Typography>
              <LinearProgress variant="determinate" value={progressData.math} sx={{ mb: 2 }} />
              
              <Typography variant="body2" gutterBottom>
                Science Discovery
              </Typography>
              <LinearProgress variant="determinate" value={progressData.science} sx={{ mb: 2 }} />
              
              <Typography variant="body2" gutterBottom>
                Safety Education
              </Typography>
              <LinearProgress variant="determinate" value={progressData.safety} sx={{ mb: 2 }} />
            </Box>
          </Paper>
        </Grid>

        {/* Achievements Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            <List>
              {achievements.map((achievement, index) => (
                <React.Fragment key={achievement.title}>
                  <ListItem>
                    <ListItemIcon>{achievement.icon}</ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={achievement.description}
                    />
                  </ListItem>
                  {index < achievements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              component="h2"
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                color: 'primary.main',
                textAlign: 'center'
              }}
            >
              Profile Settings
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Avatar
                src={currentUser?.photoURL || undefined}
                alt={currentUser?.displayName || 'User'}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                onChange={handlePhotoUpload}
                disabled={loading}
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  disabled={loading}
                >
                  Change Photo
                </Button>
              </label>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                  disabled={loading}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading || !displayName}
              >
                {loading ? <CircularProgress size={24} /> : 'Update Profile'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 