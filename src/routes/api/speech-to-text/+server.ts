import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

// ISO-639-1 language code mapping
const languageCodes: { [key: string]: string } = {
    'English (UK)': 'en',
    'French': 'fr',
    'Spanish': 'es',
    'German': 'de',
    'Italian': 'it',
    'Portuguese': 'pt',
    'Dutch': 'nl',
    'Russian': 'ru',
    'Japanese': 'ja',
    'Korean': 'ko',
    'Chinese (Simplified)': 'zh',
    'Arabic': 'ar',
    'Turkish': 'tr',
    'Hindi': 'hi',
    'Bengali': 'bn',
    'Polish': 'pl',
    'Vietnamese': 'vi',
    'Thai': 'th',
    'Indonesian': 'id'
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const audioFile = formData.get('audio') as Blob;
        const language = formData.get('language') as string;

        if (!audioFile) {
            console.error('No audio file in request');
            return json({ error: 'No audio file provided' }, { status: 400 });
        }

        // Convert Blob to File with proper name and type
        const file = new File([audioFile], 'speech.webm', { type: 'audio/webm' });

        console.log('Processing audio file:', {
            size: file.size,
            type: file.type,
            language: language
        });

        // Get ISO language code or default to auto-detection
        const languageCode = language ? (languageCodes[language] || null) : null;

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: languageCode, // If null, Whisper will auto-detect the language
            response_format: 'text'
        });

        if (!transcription) {
            console.error('No transcription result received');
            return json({ error: 'No transcription result' }, { status: 500 });
        }

        return json({ text: transcription });
    } catch (error) {
        console.error('Speech to text error details:', {
            error: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return json({
            error: 'Failed to process speech',
            details: error.message
        }, { status: 500 });
    }
}; 