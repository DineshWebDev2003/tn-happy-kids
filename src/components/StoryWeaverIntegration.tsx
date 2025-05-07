import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useLanguage } from './GlobalWidgets';

interface Story {
  id: string;
  title: string;
  content: string;
  language: string;
  level: string;
  url: string;
}

interface StoryWeaverIntegrationProps {
  onStorySelect?: (story: Story) => void;
}

const StoryWeaverIntegration: React.FC<StoryWeaverIntegrationProps> = ({ onStorySelect }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    fetchStories();
  }, [lang]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      // Using StoryWeaver's API endpoint
      const response = await fetch(`https://storyweaver.org.in/api/v1/stories?language=${lang}&level=1`);
      const data = await response.json();
      setStories(data.stories || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      // Fallback stories for testing
      setStories([
        {
          id: '1',
          title: 'The Happy Alphabet',
          content: 'A is for Apple, B is for Ball, C is for Cat...',
          language: lang,
          level: '1',
          url: ''
        },
        {
          id: '2',
          title: 'Counting Fun',
          content: 'One little bird, two little birds, three little birds...',
          language: lang,
          level: '1',
          url: ''
        }
      ]);
    }
    setLoading(false);
  };

  const handleStorySelect = (story: Story) => {
    if (onStorySelect) {
      onStorySelect(story);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {lang === 'ta' ? 'கதைகள்' : 'Stories'}
      </Typography>
      {loading ? (
        <Typography>Loading stories...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {stories.map((story) => (
            <Card key={story.id} sx={{ maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h6">{story.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {story.content.substring(0, 100)}...
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => window.open(story.url, '_blank')}
                >
                  {lang === 'ta' ? 'கதையை படிக்க' : 'Read Story'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default StoryWeaverIntegration; 