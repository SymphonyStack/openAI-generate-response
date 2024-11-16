import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.argv[2];
const message = process.argv[3];

if (!apiKey || !message) {
    console.error("Usage: node index.js <API_KEY> <MESSAGE>");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: apiKey,
});

async function getChatGPTResponse(message) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
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
    try {
        const response = await getChatGPTResponse(message);
        console.log("##" + JSON.stringify({ output_message: response }) + "##");
    } catch (error) {
        console.error("##" + JSON.stringify({ error: error }) + "##");
    }
})();