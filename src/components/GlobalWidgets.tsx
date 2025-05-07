import React, { createContext, useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import TranslateIcon from '@mui/icons-material/Translate';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton } from '@mui/material';
import StoryWeaverIntegration from './StoryWeaverIntegration';
import GameSection from './GameSection';
import { useNavigate } from 'react-router-dom';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const FloatingButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 110px;
  right: 32px;
  width: 340px;
  background: linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 20px 16px 12px 16px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  font-family: 'Quicksand', 'Comic Sans MS', cursive, sans-serif;
  border: 4px solid #fffbe7;
  animation: bounce 0.5s ease-out;
  
  @keyframes bounce {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const KidoAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbc2eb 60%, #a6c1ee 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 8px;
  border: 3px solid #fffbe7;
  animation: wave 2s infinite;
  
  @keyframes wave {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
`;

const TopBar = styled.div`
  position: fixed;
  top: 12px;
  right: 32px;
  display: flex;
  gap: 12px;
  z-index: 1002;
`;

const Select = styled.select`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background: #fff;
  cursor: pointer;
`;

const ChatArea = styled.div`
  flex: 1;
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  background: #fffbe7;
  border-radius: 12px;
  padding: 10px;
  font-size: 1rem;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #43c6ac;
    border-radius: 4px;
  }
`;

const MessageBubble = styled.div<{ from: 'kido' | 'user' }>`
  text-align: ${props => props.from === 'kido' ? 'left' : 'right'};
  margin: 6px 0;
  color: ${props => props.from === 'kido' ? '#43c6ac' : '#ff9800'};
  font-weight: ${props => props.from === 'kido' ? 700 : 600};
  background: ${props => props.from === 'kido' ? 'rgba(255,255,255,0.7)' : 'rgba(255, 232, 180, 0.7)'};
  border-radius: 12px;
  padding: 8px 12px;
  display: inline-block;
  max-width: 85%;
  animation: popIn 0.3s ease-out;
  
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const ChatInputRow = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const ChatInput = styled.input`
  flex: 1;
  border-radius: 12px;
  border: 2px solid #ffd54f;
  padding: 8px 12px;
  font-size: 1rem;
  font-family: 'Quicksand', 'Comic Sans MS', cursive, sans-serif;
  background: #fffbe7;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #43c6ac;
    box-shadow: 0 0 0 2px rgba(67, 198, 172, 0.2);
  }
`;

const ActionButton = styled.button<{ isActive?: boolean }>`
  background: ${props => props.isActive ? '#ffd54f' : '#fff'};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.isActive ? '#ffd54f' : '#f0f0f0'};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'colorful', label: 'Colorful' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'hi', label: 'हिन्दी' },
];

const femaleVoice = (window.speechSynthesis?.getVoices() || []).find(v => v.name.toLowerCase().includes('female'));

const OPENAI_API_KEY: string = process.env.REACT_APP_OPENAI_API_KEY || '';

// Add type for message
type Message = {
  from: 'kido' | 'user';
  text: string;
};

const quickReplies = [
  { label: '😊', value: '😊' },
  { label: 'Tell me a story', value: 'Can you tell me a story?' },
  { label: 'Show stories', value: 'Show me some stories!' },
  { label: 'Learn ABC', value: 'Teach me the alphabet!' },
  { label: 'Count with me', value: 'Let\'s count numbers!' },
  { label: 'Sing a song', value: 'Can you sing a song?' },
  { label: 'Play a game', value: 'Let\'s play a learning game!' },
  { label: '🎨', value: 'Show me some art!' },
];

const learningContent = {
  alphabet: {
    en: "Let's learn the alphabet! A is for Apple, B is for Ball, C is for Cat...",
    ta: "எழுத்துக்களை கற்றுக்கொள்வோம்! அ என்பது அப்பிள், ஆ என்பது ஆடு..."
  },
  numbers: {
    en: "Let's count together! 1, 2, 3, 4, 5...",
    ta: "ஒன்றாக எண்ணுவோம்! 1, 2, 3, 4, 5..."
  },
  stories: {
    en: "Once upon a time, there was a little girl who loved to learn...",
    ta: "ஒரு காலத்தில், கற்றுக்கொள்ள விரும்பிய ஒரு சிறுமி இருந்தாள்..."
  }
};

const funGreetings = [
  "Hi! I'm Kido, your virtual friend! How can I help you today?",
  "Hello! Ready to play and learn? 😊",
  "Hey there! Ask me anything or just say hi!",
  "Welcome! Let's have some fun together! 🎉",
  "Hi! I'm here to help you learn and play! 🧩"
];

const KidoChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'kido' as const, text: funGreetings[Math.floor(Math.random() * funGreetings.length)] }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const sendAudio = useRef<HTMLAudioElement | null>(null);
  const receiveAudio = useRef<HTMLAudioElement | null>(null);
  const { lang, setLang } = useLanguage();
  const [showStories, setShowStories] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Play sound effects
  const playSend = () => { sendAudio.current?.play(); };
  const playReceive = () => { receiveAudio.current?.play(); };

  // Preload voices for speech synthesis
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      // Try to load voices after a short delay (Chrome workaround)
      setTimeout(() => {
        window.speechSynthesis.getVoices();
      }, 100);
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const speak = (text: string) => {
    if (muted) {
      console.log('Speech is muted.');
      return;
    }
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    if (!voices.length) {
      alert('No speech synthesis voices are available on your system. Please check your browser or OS settings.');
      return;
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.pitch = 1.2;
    utter.rate = 0.9;
    utter.lang = 'en-US';
    // Prefer Google or Microsoft female voices, fallback to any female, then default
    const preferredVoice = voices.find(v => v.name.toLowerCase().includes('female') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('microsoft')))
      || voices.find(v => v.name.toLowerCase().includes('female'))
      || voices[0];
    if (preferredVoice) utter.voice = preferredVoice;
    console.log('Speaking:', text, 'Voice:', preferredVoice?.name);
    synth.speak(utter);
  };

  // Enhanced speech recognition
  const listen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    setListening(true);
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      setTimeout(() => sendMessage(undefined, transcript), 500);
    };
    recognition.onerror = (event: any) => {
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  // Send message to API (revert to fetch for browser compatibility)
  const sendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const msgText = overrideInput !== undefined ? overrideInput : input;
    if (!msgText.trim()) return;

    // Add user message
    const userMsg: Message = { from: 'user' as const, text: msgText };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    playSend();
    setTyping(true);

    // Only use fallback for greetings
    const lowerMsg = msgText.toLowerCase();
    if (lowerMsg === 'hi' || lowerMsg === 'hello' || lowerMsg === 'hey') {
      setTimeout(() => {
        const reply: Message = { 
          from: 'kido' as const, 
          text: "Hi! I'm Kido, your friendly AI teacher! Would you like to learn the alphabet, count numbers, or hear a story? 😊" 
        };
        setMessages(msgs => [...msgs, reply]);
        setTyping(false);
        playReceive();
        speak(reply.text);
      }, 1000);
      return;
    }

    // For all other questions, always try the OpenAI API first
    try {
      const res = await fetch('http://localhost:3001/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { 
              role: 'system', 
              content: "You are Kido, a friendly, playful, and encouraging female AI teacher for kids. Always reply in a fun, simple, and positive way. Use emojis and stickers! Keep responses short and engaging. Focus on teaching and helping kids learn." 
            },
            ...messages.filter(m => m.from === 'user' || m.from === 'kido').map(m => ({ 
              role: m.from === 'user' ? 'user' : 'assistant', 
              content: m.text 
            })),
            { role: 'user', content: msgText }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (!res.ok) {
        throw new Error('API response was not ok');
      }

      const data = await res.json();
      const replyText = data.choices?.[0]?.message?.content || "Let's learn something fun together! What would you like to know? 😊";
      
      const reply: Message = { from: 'kido' as const, text: replyText };
      setTimeout(() => {
        setMessages(msgs => [...msgs, reply]);
        setTyping(false);
        playReceive();
        speak(reply.text);
      }, 1200);
    } catch (err) {
      console.error('Chatbot API error:', err);
      // Fallback responses for different types of questions
      let fallbackResponse = "I'm here to help you learn! What would you like to know? 😊";
      
      if (lowerMsg.includes('teach') || lowerMsg.includes('learn')) {
        fallbackResponse = "I'd love to teach you! What would you like to learn about? 📚";
      } else if (lowerMsg.includes('play') || lowerMsg.includes('game')) {
        fallbackResponse = "Let's play a fun learning game! Would you like to try math or word games? 🎮";
      } else if (lowerMsg.includes('song') || lowerMsg.includes('sing')) {
        fallbackResponse = "I can sing the ABC song with you! Would you like to try? 🎵";
      }

      const reply: Message = { from: 'kido' as const, text: fallbackResponse };
      setTimeout(() => {
        setMessages(msgs => [...msgs, reply]);
        setTyping(false);
        playReceive();
        speak(reply.text);
      }, 1200);
    }
  };

  const handleStorySelect = (story: { title: string; content: string }) => {
    const storyMessage: Message = {
      from: 'kido' as const,
      text: `Let me tell you a story: ${story.title}. ${story.content}`
    };
    setMessages(msgs => [...msgs, storyMessage]);
    speak(storyMessage.text);
  };

  const handleGameSelect = (game: { id: string; title: string; description: string }) => {
    const gameMessage: Message = {
      from: 'kido' as const,
      text: `Great choice! Let's play ${game.title}! ${game.description} 🎮`
    };
    setMessages(msgs => [...msgs, gameMessage]);
    speak(gameMessage.text);
    // Navigate to the game
    navigate(`/games/${game.id}`);
  };

  return (
    <>
      <audio ref={sendAudio} src="/sounds/send.mp3" preload="auto" />
      <audio ref={receiveAudio} src="/sounds/receive.mp3" preload="auto" />
      <FloatingButton onClick={() => setOpen((v) => !v)} title="Chat with Kido!">
        <span role="img" aria-label="Kido">👧🏻</span>
      </FloatingButton>
      {open && (
        <ChatWindow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <KidoAvatar style={{ boxShadow: typing ? '0 0 16px 4px #ffd54f' : listening ? '0 0 16px 4px #43c6ac' : undefined, transition: 'box-shadow 0.3s' }}>👧🏻</KidoAvatar>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#a6c1ee', flex: 1 }}>Kido (AI)</div>
            <IconButton onClick={() => setMuted(m => !m)} size="small" title={muted ? 'Unmute' : 'Mute'}>
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </div>
          <ChatArea ref={chatAreaRef}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} from={msg.from as 'kido' | 'user'}>
                {msg.text}
              </MessageBubble>
            ))}
            {typing && (
              <MessageBubble from="kido">
                <span role="img" aria-label="thinking">🤔</span> Kido is thinking...
              </MessageBubble>
            )}
          </ChatArea>
          {showStories && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <StoryWeaverIntegration onStorySelect={handleStorySelect} />
            </Box>
          )}
          {showGames && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <GameSection onGameSelect={handleGameSelect} />
            </Box>
          )}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '8px 0' }}>
            {quickReplies.map(q => (
              <button key={q.value} style={{
                background: '#fffbe7',
                border: '2px solid #ffd54f',
                borderRadius: 12,
                padding: '4px 12px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginRight: 4,
                marginBottom: 4,
                fontFamily: 'Quicksand, Comic Sans MS, cursive',
                transition: 'background 0.2s',
              }} onClick={() => sendMessage(undefined, q.value)}>{q.label}</button>
            ))}
          </div>
          <ChatInputRow onSubmit={sendMessage}>
            <ChatInput
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={listening}
            />
            <ActionButton 
              type="button" 
              onClick={listen} 
              isActive={listening}
              title={listening ? "Listening..." : "Speak"}
            >
              <MicIcon style={{ color: listening ? '#ff9800' : '#43c6ac' }} />
            </ActionButton>
            <ActionButton 
              type="submit"
              title="Send message"
            >
              <SendIcon style={{ color: '#fff' }} />
            </ActionButton>
          </ChatInputRow>
        </ChatWindow>
      )}
    </>
  );
};

export const LanguageContext = createContext({
  lang: 'en',
  setLang: (l: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

const GlobalWidgets: React.FC = () => {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');

  // TODO: Connect these to your i18n and theme context

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <TopBar>
        <label>
          <TranslateIcon style={{ verticalAlign: 'middle', marginRight: 4 }} />
          <Select value={lang} onChange={e => setLang(e.target.value)}>
            {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </Select>
        </label>
        <label>
          <ColorLensIcon style={{ verticalAlign: 'middle', marginRight: 4 }} />
          <Select value={theme} onChange={e => setTheme(e.target.value)}>
            {themes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
        </label>
      </TopBar>
      <KidoChatbot />
    </LanguageContext.Provider>
  );
};

export default GlobalWidgets; 