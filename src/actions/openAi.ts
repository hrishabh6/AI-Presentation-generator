"use server";
import OpenAI from "openai";

export const generateCreativePromptOpenAi = async (userPrompt: string) => {
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const finalPrompt = `Create a coherent and relevant outline for the following prompt: "${userPrompt}".  
- The outline should contain exactly 6 points, with each point written as as single sentence.
- Ensure the outline is **well structured** and directly related to the topic.
- Return only **valid JSON output** with this exact format:

json
{
  "outlines": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5",
    "Point 6"
  ]
}
  Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
`;

  try {
    const completion = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that generated outlines for presentations",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.0,
    });

    const responseContent = completion.choices[0].message.content;
    if (responseContent) {
      try {
        const cleanedResponse = responseContent
          .replace(/```json|```/g, "")
          .trim();
        const jsonResponse = JSON.parse(cleanedResponse);

        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.log("Invalid JSON recieved : ", responseContent, error);
        return { status: 500, error: "Invalid JSON format recieved from AI" };
      }
    }

    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.log("❌ Error in generateCreativePrompt", error);
    return { status: 500, error: "Internal Server error" };
  }
};
