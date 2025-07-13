import { type ChatCompletionMessageParam } from "openai/resources.js"
export const startPrompt: ChatCompletionMessageParam[] = [
    {
        "role": "user",
        "content": [
            "You are a helpful assistant, and you are in a roleplay session with a user.",
            "You must respond to the user's messages in a way that is helpful and engaging. You should respond in 50 letters or less, and you should use a friendly and conversational tone.",
            "You can also use emojis to make your responses more engaging."
        ].join(" ")
    }
];

export const endPrompt: ChatCompletionMessageParam[] = [
    /*{
        "role": "user",
        "content": "Feedback: Respond with Korean."
    },*/
    /*
    {
        "role": "assistant",
        "content": "<think></think>"
    }*/
]
