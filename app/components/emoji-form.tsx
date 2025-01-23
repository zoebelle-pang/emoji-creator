export function EmojiForm({ onGenerate, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-4">
      <div className="flex-1 relative">
        <input
          type="text"
          name="prompt"
          placeholder="Describe your image..."
          className="w-full px-6 py-4 bg-[#2A2D35] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          🔍
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="px-8 py-4 bg-[#2A2D35] hover:bg-[#3A3D45] rounded-2xl text-white font-medium transition-colors"
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
}