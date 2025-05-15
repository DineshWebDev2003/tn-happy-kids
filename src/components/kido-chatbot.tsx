"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Volume2, Mic, Send, X, Bot } from "lucide-react";

const kidoAvatar = "/alphabets/kido-avatar.jpg"; // Correct public path for Next.js
// Hardcoded API keys based on .env.local values
const GEMINI_API_KEY = "AIzaSyC9fsf08cIjq73zs4xQ8QFSUxLnpUvC3XU";
const GEMINI_MODEL = "gemini-2.0-flash";

// Updated quick actions for more comprehensive navigation
const quickActions = [
  { label: "Learn ABC", intent: "alphabet" },
  { label: "Play games", intent: "game" },
  { label: "Show stories", intent: "stories" },
  { label: "Who made you?", intent: "creator" },
  { label: "Video lessons", intent: "videos" },
  { label: "Safety tips", intent: "safety" },
];

// About TN Happy Kids content - shorter summary
const aboutSchoolInfo = `Welcome to TN Happy Kids Play School! We provide a safe, nurturing environment where children learn and grow through play. Our mission is to inspire creativity, build confidence, and develop cognitive, social and emotional skills. We believe in fostering curiosity, encouraging friendship skills, and building strong foundations for academic success.`;

// Creator information
const creatorInfo = `I was made by Maas Tech for TN Happy Kids Play School. I'm here to help children learn and navigate through all the fun educational content!`;

function detectIntent(text: string) {
  const lower = text.toLowerCase();
  
  // Educational content intents
  if (lower.includes("abc") || lower.includes("alphabet")) return "alphabet";
  if (lower.includes("number") || lower.includes("count")) return "numbers";
  if (lower.includes("story") || lower.includes("read")) return "stories";
  if (lower.includes("game") || lower.includes("play")) return "game";
  if (lower.includes("song") || lower.includes("sing")) return "song";
  if (lower.includes("video") || lower.includes("watch")) return "videos";
  
  // Navigation intents
  if (lower.includes("home") || lower.includes("main page")) return "home";
  if (lower.includes("learn") || lower.includes("lesson")) return "learn";
  if (lower.includes("safety") || lower.includes("protect")) return "safety";
  
  // About intents
  if (lower.includes("who made") || lower.includes("creator") || lower.includes("developer")) return "creator";
  if (lower.includes("about") || lower.includes("tn happy kids")) return "about";
  
  return "general";
}

function getContentSuggestion(intent: string): string {
  switch (intent) {
    case "alphabet":
      return "In our Alphabet Fun section, you can learn all letters from A to Z with colorful examples and interactive activities.";
    case "game":
      return "We have many educational games like shape matching, counting games, and memory activities to boost your learning!";
    case "stories":
      return "Explore wonderful stories that help you learn important values and improve your reading skills.";
    case "videos":
      return "Watch fun educational videos with animated characters teaching you about letters, numbers, and more!";
    case "safety":
      return "Learn important safety tips to keep yourself protected online and in the real world.";
    case "about":
      return aboutSchoolInfo;
    case "creator":
      return creatorInfo;
    default:
      return "";
  }
}

export default function KidoChatbot() {
  const [messages, setMessages] = useState([
    { from: "kido", text: "Hi there! I'm Kido from TN Happy Kids. I can help you learn alphabets, play games, read stories, or tell you about our school! What would you like to do today? 🎉" },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBotIcon, setShowBotIcon] = useState(false);
  const recognitionRef = useRef<any>(null);
  const router = useRouter();

  // Text-to-speech
  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSpeaking(true);
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.onend = () => setSpeaking(false);
      utter.rate = 1;
      utter.pitch = 1.1;
      const voice = window.speechSynthesis.getVoices().find(v => v.name.toLowerCase().includes("female")) || null;
      utter.voice = voice;
      window.speechSynthesis.speak(utter);
    }
  };

  // Speech-to-text
  const startListening = () => {
    if (typeof window !== "undefined" && (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
        handleSend(transcript);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  // Gemini API call
  async function askGeminiAPI(text: string): Promise<string> {
    try {
      const contextPrompt = "You are Kido, a friendly AI assistant for TN Happy Kids learning platform for children, created by Maas Tech.\n" +
        "If asked about TN Happy Kids, respond with information about our school.\n" +
        "If asked who made you, always mention you were created by Maas Tech.\n" +
        "Keep responses simple, child-friendly, educational and under 3 sentences if possible.\n" +
        "The platform has sections for: Alphabet learning, Educational games, Stories, Video lessons, and Safety tips.";
      
      const fullPrompt = contextPrompt + "\n\nChild's question: " + text;
      
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent?key=" + GEMINI_API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      });
      const data = await res.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't think of an answer!"
      );
    } catch (e) {
      return "Sorry, there was a problem connecting to Gemini.";
    }
  }

  // Enhanced askGemini with navigation and content suggestions
  async function askGemini(text: string): Promise<string> {
    const intent = detectIntent(text);
    const contentSuggestion = getContentSuggestion(intent);
    
    switch (intent) {
      case "alphabet":
        router.push("/learn/alphabets");
        return `Let's learn the alphabet together! ${contentSuggestion}`;
      
      case "numbers":
        router.push("/learn/games");
        return `Let's count and play number games! We have fun counting activities for you.`;
      
      case "stories":
        router.push("/stories");
        return `Here are some wonderful stories for you! ${contentSuggestion}`;
      
      case "game":
        router.push("/learn/games");
        return `Let's play fun educational games! ${contentSuggestion}`;
      
      case "videos":
        router.push("/learn/videos");
        return `Let's watch some educational videos! ${contentSuggestion}`;
      
      case "safety":
        router.push("/safety");
        return `Safety is important! ${contentSuggestion}`;
      
      case "home":
        router.push("/");
        return "Going to our home page where you can see all activities!";
      
      case "learn":
        router.push("/learn");
        return "Let's explore all our learning activities including alphabets, games and videos!";
      
      case "about":
        return `${contentSuggestion} Would you like to learn alphabets, play games, or read stories?`;
      
      case "creator":
        return `${contentSuggestion} I can help you explore all our fun learning activities!`;
      
      case "song":
        return "🎵 La la la! Let's sing a song together! (Feature coming soon)";
      
      default:
        return await askGeminiAPI(text);
    }
  }

  const handleSend = async (msg?: string) => {
    const text = (msg ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    const reply = await askGemini(text);
    setMessages((m) => [...m, { from: "kido", text: reply }]);
    speak(reply);
  };

  return (
    <>
      {/* Floating Icon Button */}
      {!open && (
        <button
          className="fixed bottom-20 md:bottom-8 right-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center border-4 border-white hover:scale-105 transition-transform"
          onClick={() => setOpen(true)}
          aria-label="Open Kido Chatbot"
        >
          {!showBotIcon ? (
            <img
              src={kidoAvatar}
              alt="Kido"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              onError={() => setShowBotIcon(true)}
            />
          ) : (
            <Bot className="w-8 h-8 md:w-10 md:h-10 text-green-700" />
          )}
        </button>
      )}

      {/* Chatbot Window */}
      {open && (
        <div className="fixed bottom-20 md:bottom-8 right-8 z-50 w-80 max-w-full rounded-2xl shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 border border-green-200 animate-fade-in">
          <div className="flex items-center gap-2 p-3 border-b border-green-200 relative">
            <img src={kidoAvatar} alt="Kido" className="w-10 h-10 rounded-full border-2 border-white" />
            <span className="font-bold text-lg text-green-800">Kido (AI)</span>
            <div className="ml-auto flex items-center gap-3">
              <button 
                className={`p-1 rounded-full hover:bg-green-200`}
                title="Audio"
              >
                <Volume2 className={`w-5 h-5 ${speaking ? "animate-pulse text-green-500" : "text-green-300"}`} />
              </button>
              <button
                className="p-1 rounded-full hover:bg-green-200"
                onClick={() => setOpen(false)}
                aria-label="Close Kido Chatbot"
              >
                <X className="w-5 h-5 text-green-700" />
              </button>
            </div>
          </div>
          <div className="p-3 space-y-2 min-h-[80px] max-h-64 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "kido" ? "justify-start" : "justify-end"}`}>
                <div className={`rounded-xl px-3 py-2 text-sm max-w-[80%] ${msg.from === "kido" ? "bg-white text-green-900" : "bg-green-200 text-green-900"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 px-3 pb-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg px-3 py-1 text-xs font-semibold shadow-sm border border-yellow-200"
                onClick={() => handleSend(action.label)}
              >
                {action.label}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2 p-3 border-t border-green-200"
            onSubmit={e => { e.preventDefault(); handleSend(); }}
          >
            <button type="button" onClick={startListening} className={`p-2 rounded-full ${listening ? "bg-green-200" : "bg-white"}`} title="Speak">
              <Mic className={listening ? "animate-pulse text-green-600" : "text-green-400"} />
            </button>
            <input
              className="flex-1 rounded-lg border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={listening}
            />
            <button type="submit" className="p-2 rounded-full bg-green-200 hover:bg-green-300" title="Send">
              <Send className="text-green-700" />
            </button>
          </form>
        </div>
      )}
    </>
  );
} 