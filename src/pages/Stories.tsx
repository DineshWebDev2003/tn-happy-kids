import React from 'react';
import { useLocation } from 'react-router-dom';

const Stories: React.FC = () => {
  const location = useLocation();
  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      background: 'linear-gradient(135deg, #fbc2eb 0%, #f8ffae 100%)',
      borderRadius: 24,
      padding: 24,
      boxShadow: '0 8px 32px #ffd54f55',
      marginTop: 32,
      border: '4px solid #ffd54f'
    }}>
      <h2 style={{ color: '#f7971e', fontFamily: 'Comic Sans MS, cursive', textAlign: 'center' }}>
        📚 Kids' Stories (Powered by StoryWeaver)
      </h2>
      <iframe
        key={location.key}
        src="https://storyweaver.org.in/stories?language=Tamil"
        title="Tamil Stories from StoryWeaver"
        width="100%"
        height="600"
        style={{ border: 'none', borderRadius: 16, marginTop: 16 }}
        allowFullScreen
      />
      <div style={{ textAlign: 'center', marginTop: 16, color: '#888', fontSize: '1rem' }}>
        If you don't see the stories above,{' '}
        <a href="https://storyweaver.org.in/stories?language=Tamil" target="_blank" rel="noopener noreferrer" style={{ color: '#f7971e', fontWeight: 700 }}>
          click here to open in a new tab
        </a>.
      </div>
      <div style={{ textAlign: 'center', marginTop: 12, color: '#888', fontSize: '0.95rem' }}>
        Stories courtesy of <a href="https://storyweaver.org.in/" target="_blank" rel="noopener noreferrer">StoryWeaver</a>
      </div>
    </div>
  );
};

export default Stories; 