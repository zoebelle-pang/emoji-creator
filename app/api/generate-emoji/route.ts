import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // Using a different placeholder service that returns PNG
    const newEmoji = {
      id: Date.now().toString(),
      imageUrl: 'https://placehold.co/100x100.png', // Added .png extension
      prompt: prompt,
      likes: 0
    };

    return NextResponse.json(newEmoji);
  } catch (error) {
    console.error('Error in generate-emoji API:', error);
    return NextResponse.json(
      { error: 'Failed to generate emoji' },
      { status: 500 }
    );
  }
}

return NextResponse.json(newEmoji);
   catch (error) {
    console.error('Error in generate-emoji API:', error);
    return NextResponse.json(
      { error: 'Failed to generate emoji' },
      { status: 500 }
    );
  }



