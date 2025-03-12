"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateCreativePromptGemini = async (userPrompt: string) => {
  try {
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a helpful AI that generates outlines for presentations"
    });
    
    const finalPrompt = `Create a coherent and relevant outline for the following prompt: "${userPrompt}".
    - Keep in consideration that these outlines are for furture prompts, with each point being a single slide prompt.  
- The outline should contain exactly 6 points, with each point written as as single sentence.
- Ensure the outline is **well structured** and directly related to the topic.
- Return only **valid JSON output** with this exact format:

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

Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.`;

    // Generate content with appropriate configurations
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: finalPrompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.0,
      }
    });

    const responseContent = result.response.text();
    
    if (responseContent) {
      try {
        // Clean the response in case the model adds code blocks or extra formatting
        const cleanedResponse = responseContent
          .replace(/```json|```/g, "")
          .trim();
        const jsonResponse = JSON.parse(cleanedResponse);

        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.log("Invalid JSON received: ", responseContent, error);
        return { status: 500, error: "Invalid JSON format received from AI" };
      }
    }

    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.log("❌ Error in generateCreativePrompt", error);
    return { status: 500, error: "Internal Server error" };
  }
};