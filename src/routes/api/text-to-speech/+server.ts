import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { text, voice = 'alloy' } = await request.json();

        if (!text) {
            return json({ error: 'No text provided' }, { status: 400 });
        }

        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: voice,
            input: text,
        });

        // Convert the raw audio data to base64
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const base64Audio = buffer.toString('base64');

        return json({ audio: base64Audio });
    } catch (error) {
        console.error('Text to speech error:', error);
        return json({ error: 'Failed to convert text to speech' }, { status: 500 });
    }
}; 