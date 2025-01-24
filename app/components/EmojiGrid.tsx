import Image from 'next/image';
import { useState } from 'react';

export function EmojiGrid({ emojis }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="rounded-lg p-4 bg-white shadow">
          {emoji.imageUrl ? (
            <>
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src={emoji.imageUrl}
                  alt={emoji.prompt}
                  fill
                  className="rounded-lg object-cover"
                  onError={(e) => {
                    console.error('Image load error:', e);
                    // Optionally set a fallback image
                    // e.target.src = '/fallback.png';
                  }}
                />
              </div>
              <p className="mt-2 text-center">{emoji.prompt}</p>
              <p className="text-xs text-gray-500">URL: {emoji.imageUrl}</p>
            </>
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center">
              Loading...
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 