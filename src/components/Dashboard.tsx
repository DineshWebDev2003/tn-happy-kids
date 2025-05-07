import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  uploadDate: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Story Time: The Three Little Pigs',
      thumbnail: '/thumbnails/story1.jpg',
      uploadDate: '2024-03-15',
      status: 'completed',
    },
    // Add more sample videos here
  ]);

  const handleUploadVideo = () => {
    // Implement video upload logic
  };

  const handlePlayVideo = (videoId: string) => {
    // Implement video playback logic
  };

  const handleEditVideo = (videoId: string) => {
    // Implement video edit logic
  };

  const handleDeleteVideo = (videoId: string) => {
    // Implement video deletion logic
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">
                Weekly Video Dashboard
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleUploadVideo}
                sx={{ backgroundColor: theme.palette.primary.main }}
              >
                Upload New Video
              </Button>
            </Box>
          </Paper>
        </Grid>

        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnail}
                alt={video.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uploaded: {new Date(video.uploadDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {video.status}
                </Typography>
              </CardContent>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-around' }}>
                <IconButton onClick={() => handlePlayVideo(video.id)}>
                  <PlayIcon />
                </IconButton>
                <IconButton onClick={() => handleEditVideo(video.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteVideo(video.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 