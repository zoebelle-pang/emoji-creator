"use client"
import { useState } from "react";
import { Search, RefreshCw, Globe, Menu } from 'lucide-react';
import { EmojiGrid } from "@/components/emoji-grid";

// This would normally come from your database
const mockEmojis = [
  {
    id: '1',
    imageUrl: '/path/to/emoji.png',
    prompt: 'a tiger',
    likes: 0
  },
  // ... more emojis
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/generate-emoji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate emoji');
      }

      setEmojis(prev => [...prev, data]);
      setPrompt(""); // Clear input after successful generation
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900/50 to-gray-800/50 p-4">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
        <div className="flex items-center space-x-8">
          <span className="text-white font-bold text-2xl">O2®</span>
          <div className="hidden md:flex space-x-6 text-gray-300">
            <a href="#" className="hover:text-white">Moonish</a>
            <a href="#" className="hover:text-white">New in</a>
            <a href="#" className="hover:text-white">Collection</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Globe className="text-gray-300 w-5 h-5" />
          <Menu className="text-gray-300 w-5 h-5" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col space-y-8">
          {/* Input Section */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-6xl font-bold text-white tracking-tight">Emoji Maker</h1>
            <div className="flex space-x-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your emoji..."
                className="flex-1 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-4 text-white flex items-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Generate</span>
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 text-red-200 p-4 rounded-2xl backdrop-blur-lg">
              {error}
            </div>
          )}

          {/* Emoji Grid */}
          <EmojiGrid emojis={emojis} />
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-lg rounded-full px-8 py-4 flex items-center space-x-4">
          <span className="text-white/80">NEW · COSMIC</span>
          <span className="text-white font-bold">SET 23↗</span>
        </div>
      </div>
    </div>
  );
}
