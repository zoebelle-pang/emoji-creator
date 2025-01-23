"use client"
import { EmojiForm } from '@/components/emoji-form';
import { EmojiGrid } from '@/components/emoji-grid';

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
  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Emoji Maker</h1>
      
      <EmojiForm 
        onGenerate={async (prompt) => {
          try {
            const response = await fetch('/api/generate-emoji', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
              throw new Error('Failed to generate emoji');
            }

            const newEmoji = await response.json();
            
            if (!newEmoji.imageUrl) {
              throw new Error('No image URL in response');
            }

            console.log('Generated emoji:', newEmoji); // Debug log
            setEmojis(prevEmojis => [...prevEmojis, newEmoji]);
          } catch (error) {
            console.error('Error generating emoji:', error);
            // Add user feedback here
          }
        }} 
      />

      <EmojiGrid emojis={mockEmojis} />
    </div>
  );
}
