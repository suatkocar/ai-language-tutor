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

        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: voice,
            input: text,
        });

        // Get audio data as Uint8Array
        const audioData = new Uint8Array(await mp3.arrayBuffer());
        // Convert to base64 without using Buffer
        const base64Audio = btoa(String.fromCharCode.apply(null, audioData));

        return json({ audio: base64Audio });
    } catch (error) {
        console.error('Text to speech error:', error);
        return json({ error: 'Failed to convert text to speech' }, { status: 500 });
    }
}; 