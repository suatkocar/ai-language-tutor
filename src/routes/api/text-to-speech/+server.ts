import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

export const config = {
    runtime: 'edge'
};

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { text, voice = 'alloy' } = await request.json();

        if (!text) {
            return json({ error: 'No text provided' }, { status: 400 });
        }

        const mp3Response = await openai.audio.speech.create({
            model: 'tts-1',
            voice: voice,
            input: text,
        });

        // Get the audio data as an ArrayBuffer
        const audioData = await mp3Response.arrayBuffer();
        
        // Convert ArrayBuffer to Base64
        const base64Audio = Buffer.from(audioData).toString('base64');

        return json({ audio: base64Audio });
    } catch (error) {
        console.error('Text to speech error:', error);
        return json({ error: 'Failed to convert text to speech' }, { status: 500 });
    }
}; 