import Image from 'next/image';

export function EmojiGrid({ emojis }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 group hover:bg-gray-700/50 transition-all"
        >
          <div className="relative w-full aspect-square">
            <Image
              src={emoji.imageUrl}
              alt={emoji.prompt}
              fill
              className="rounded-xl object-cover"
              onError={(e) => {
                console.error('Image load error:', e);
              }}
            />
          </div>
          {/* Remove background and keep just the words */}
          <p className="mt-4 text-gray-300 text-center">{emoji.prompt}</p>
        </div>
      ))}
    </div>
  );
}
