'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export function EmojiForm({ onGenerate }: { onGenerate: (prompt: string) => Promise<void> }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      await onGenerate(prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          placeholder="Enter emoji prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating Emoji...' : 'Generate Emoji'}
        </Button>
      </form>
    </Card>
  );
} 