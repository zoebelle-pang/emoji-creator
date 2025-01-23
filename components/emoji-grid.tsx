'use client';

import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Download } from 'lucide-react';
import Image from 'next/image';

interface Emoji {
  id: string;
  imageUrl: string;
  prompt: string;
  likes: number;
}

export function EmojiGrid({ emojis }: { emojis: Emoji[] }) {
  const handleDownload = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emoji.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-7xl">
      {emojis.map((emoji) => (
        <Card key={emoji.id} className="relative group">
          <div className="relative aspect-square">
            <Image
              src={emoji.imageUrl}
              alt={emoji.prompt}
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white hover:bg-black/20"
                onClick={() => handleDownload(emoji.imageUrl)}
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white hover:bg-black/20"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500 p-2">{emoji.prompt}</p>
        </Card>
      ))}
    </div>
  );
} 