import OpenAI from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources';
import env from './env.json' with { type: "json" };
import { startPrompt, endPrompt } from './prompt.ts';
const openai = new OpenAI({
    baseURL: env.LLM_ENDPOINT,
    apiKey: env.LLM_KEY,
});
export default async function completion(...prompt: ChatCompletionMessageParam[]) {
    //build raw, unmodified message
    const message = [
        ...startPrompt,
        ...prompt,
        ...endPrompt,
    ]

    console.log("Inference start...");
    console.log("Payload:", JSON.stringify(message, null, 2));
    const completion = await openai.chat.completions.create({
        model: env.LLM_MODEL,
        messages: message,
        max_completion_tokens: env.MAX_COMPLETION_TOKENS,
    });
    if (completion.choices[0].message.refusal)
        return `Rifusal with ${completion.choices[0].message.refusal}! Message: ${completion.choices[0].message.content}`;
    return completion.choices[0].message.content || "No content returned from LLM.";

}
