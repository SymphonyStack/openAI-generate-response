import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGPTResponse(message) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
                role: "system",
                content: "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.",
            },
            {
                role: "user",
                content: message,
            },
        ],
    });

    return completion.choices[0].message.content;
}

// Example usage
(async() => {
    const message = "Hello, how are you?";
    const response = await getChatGPTResponse(message);
    console.log(response);
})();