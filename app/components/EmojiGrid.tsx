import Image from 'next/image';

export function EmojiGrid({ emojis }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="rounded-lg p-4 bg-white shadow">
          <Image
            src={emoji.imageUrl}
            alt={emoji.prompt}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <p className="mt-2 text-center">{emoji.prompt}</p>
        </div>
      ))}
    </div>
  );
} 