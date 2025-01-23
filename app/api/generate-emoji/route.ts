import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // First, create the prediction
    const prediction = await replicate.predictions.create({
      version: "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      input: {
        prompt,
        apply_watermark: false
      }
    });

    console.log('Initial prediction:', prediction); // Debug log

    // Then wait for the prediction to complete
    let result = await replicate.predictions.get(prediction.id);
    console.log('Initial result:', result); // Debug log

    // Wait until the prediction is completed
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await replicate.predictions.get(prediction.id);
      console.log('Updated result:', result); // Debug log
    }

    if (result.status === 'succeeded') {
      console.log('Final output:', result.output); // Debug log
      
      return NextResponse.json({
        id: Date.now().toString(),
        imageUrl: result.output[0], // Replicate usually returns an array of URLs
        prompt: prompt,
        likes: 0
      });
    }

    throw new Error('Failed to generate image');
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to generate emoji' },
      { status: 500 }
    );
  }
} 