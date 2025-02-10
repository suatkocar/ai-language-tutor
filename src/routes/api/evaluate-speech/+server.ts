import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { text, language, level } = await request.json();

        if (!text) {
            return json({ error: 'No text provided' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful ${language} language tutor. Evaluate the student's speech for a ${level} level learner. 
                    Provide feedback on:
                    1. Pronunciation and accent
                    2. Grammar and sentence structure
                    3. Vocabulary usage
                    4. Natural flow and fluency
                    
                    Be encouraging but honest. Give specific examples and suggestions for improvement.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const feedback = completion.choices[0]?.message?.content || 'No feedback available';
        return json({ feedback });
    } catch (error) {
        console.error('Speech evaluation error:', error);
        return json({ error: 'Failed to evaluate speech' }, { status: 500 });
    }
}; 