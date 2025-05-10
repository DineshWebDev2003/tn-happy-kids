"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Volume2, Mic, Send, X, Bot } from "lucide-react";

const kidoAvatar = "/alphabets/kido-avatar.jpg"; // Correct public path for Next.js
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const GEMINI_MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL!;

const quickActions = [
  { label: "Tell me a story", intent: "story" },
  { label: "Show stories", intent: "stories" },
  { label: "Learn ABC", intent: "alphabet" },
  { label: "Count with me", intent: "numbers" },
  { label: "Sing a song", intent: "song" },
  { label: "Play a game", intent: "game" },
];

function detectIntent(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("abc") || lower.includes("alphabet")) return "alphabet";
  if (lower.includes("number") || lower.includes("count")) return "numbers";
  if (lower.includes("story")) return "stories";
  if (lower.includes("game")) return "game";
  if (lower.includes("song") || lower.includes("sing")) return "song";
  return "general";
}

export default function KidoChatbot() {
  const [messages, setMessages] = useState([
    { from: "kido", text: "Welcome! Let's have some fun together! 🎉" },
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
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent?key=" + GEMINI_API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
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

  // Replace askGemini with Gemini API for general chat
  async function askGemini(text: string): Promise<string> {
    const intent = detectIntent(text);
    switch (intent) {
      case "alphabet":
        router.push("/learn/alphabets");
        return "Let's learn the alphabet together!";
      case "numbers":
        router.push("/learn/games");
        return "Let's count and play number games!";
      case "stories":
        router.push("/stories");
        return "Here are some wonderful stories for you!";
      case "game":
        router.push("/learn/games");
        return "Let's play a fun game!";
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
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-lg bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center border-4 border-white hover:scale-105 transition-transform"
          onClick={() => setOpen(true)}
          aria-label="Open Kido Chatbot"
        >
          {!showBotIcon ? (
            <img
              src={kidoAvatar}
              alt="Kido"
              className="w-12 h-12 rounded-full"
              onError={() => setShowBotIcon(true)}
            />
          ) : (
            <Bot className="w-10 h-10 text-green-700" />
          )}
        </button>
      )}

      {/* Chatbot Window */}
      {open && (
        <div className="fixed bottom-8 right-8 z-50 w-80 max-w-full rounded-2xl shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 border border-green-200 animate-fade-in">
          <div className="flex items-center gap-2 p-3 border-b border-green-200 relative">
            <img src={kidoAvatar} alt="Kido" className="w-10 h-10 rounded-full border-2 border-white" />
            <span className="font-bold text-lg text-green-800">Kido (AI)</span>
            <Volume2 className={`ml-auto ${speaking ? "animate-pulse text-green-500" : "text-green-300"}`} />
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-green-200"
              onClick={() => setOpen(false)}
              aria-label="Close Kido Chatbot"
            >
              <X className="w-5 h-5 text-green-700" />
            </button>
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