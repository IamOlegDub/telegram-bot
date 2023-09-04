import OpenAI from 'openai';

const OPENAI_API_KEY = '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';
// const OPENAI_API_KEY = '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'; // мій токен

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export async function getGPT3Translation(text) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Translate this to English - ${text}`,
                },
            ],
            temperature: 0.9,
            max_tokens: 256,
        });

        return response.choices[0].text;
    } catch (error) {
        throw new Error('Помилка при перекладі тексту: ' + error.message);
    }
}
