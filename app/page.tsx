"use client"
import { useState } from "react";
import { EmojiForm } from '@/components/emoji-form';
import { EmojiGrid } from '@/components/emoji-grid';

export default function Home() {
  const [emojis, setEmojis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (prompt) => {
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
      console.log('API Response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate emoji');
      }

      if (!data.imageUrl) {
        throw new Error('No image URL in response');
      }

      setEmojis((prev) => [...prev, data]);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Emoji Maker</h1>
      
      <EmojiForm onGenerate={handleGenerate} isLoading={isLoading} />
      
      {error && (
        <div className="text-red-500">
          Error: {error}
        </div>
      )}

      <EmojiGrid emojis={emojis} />
    </div>
  );
}
