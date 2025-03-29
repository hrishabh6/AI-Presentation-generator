"use server";
import { ContentItem, ContentType, Slide } from "@/lib/types";
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 } from "uuid";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { uploadDirect } from '@uploadcare/upload-client'

const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY || "";

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

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = []
  if(layout.type === 'image') {
    images.push(layout)
  }
  if(Array.isArray(layout.content)) {
    layout.content.forEach((item) => {
      images.push(...findImageComponents(item as ContentItem))
    })
  } else if (layout.content && typeof layout.content === 'object') {
    images.push(...findImageComponents(layout.content))
  }

  return images
}


const uploadToUploadcare = async (base64Image: string): Promise<string> => {
  try {
    console.log("🔄 Starting image upload to Uploadcare...");
    
    // Convert base64 to a Buffer
    const buffer = Buffer.from(base64Image, "base64");
    console.log("✅ Converted base64 to Buffer");

    // Upload using Uploadcare SDK
    const result = await uploadDirect(buffer, {
      publicKey: UPLOADCARE_PUBLIC_KEY,
      store: "auto", // Auto-store the image permanently
    });

    console.log("✅ Upload successful, UUID:", result.uuid);

    // Construct and return the correct CDN URL
    const uploadcareUrl = `https://ucarecdn.com/${result.uuid}/`;
    console.log("🌍 Image accessible at:", uploadcareUrl);
    
    return uploadcareUrl;
  } catch (error) {
    console.error("❌ Error uploading to Uploadcare:", error);
    return "https://placehold.co/600x400"; // Fallback image
  }
};


const generateImageUrl = async (prompt : string) => {
  try {
    console.log("🔄 Generating image using Gemini AI...");
    
    const improvedPrompt = `
    Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture. 

    Description: ${prompt}

    Important Notes:
    - The image must be in a photorealistic style and visually compelling.
    - Ensure all text, signs, or visible writing in the image are in English.
    - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
    - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
    - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

    Example Use Cases: Business presentations, educational slides, professional designs.
    `;

    console.log("📜 Enhanced prompt:", improvedPrompt);

    // Using Gemini 2.0 for image generation
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: { responseModalities: ["Text", "Image"] },
    });

    const response = await model.generateContent(improvedPrompt);
    console.log("✅ AI Response received:", response);
    
    // Extract base64 image from response
    for (const part of response.response.candidates?.[0]?.content?.parts || []) {
      console.log("🔍 Checking response part:", part);
      if (part.inlineData) {
        const imageBase64 = part.inlineData.data;
        console.log("✅ Extracted base64 image");

        // Upload to Uploadcare and return its URL
        const uploadcareUrl = await uploadToUploadcare(imageBase64);
        console.log("✅ Image Uploaded to Uploadcare:", uploadcareUrl);
        
        return uploadcareUrl; // Return the Uploadcare CDN URL
      }
    }

    console.warn("⚠️ No valid image found in AI response, returning fallback image.");
    return "https://placehold.co/600x400"; // Fallback
  } catch (error) {
    console.error("❌ Error in generateImageUrl:", error);
    return "https://placehold.co/600x400"; // Fallback
  }
};
// Alternative function using Imagen 3 for higher quality images
const generateHighQualityImageUrl = async (prompt: string): Promise<string> => {
  try {
    // For Node.js, you would use the REST API approach since the Google Genai client
    // library for Node.js might not fully support Imagen yet
    const apiKey = process.env.GEMINI_API_KEY;
    const apiEndpoint = 'https://generativelanguage.googleapis.com/v1/models/imagen-3.0-generate-002:generateImages';
    
    const response = await fetch(`${apiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        number_of_images: 1,
        aspect_ratio: "16:9", // Better for presentation slides
        person_generation: "ALLOW_ADULT"
      }),
    });
    
    const data = await response.json();
    
    if (data.generatedImages && data.generatedImages.length > 0) {
      // Save the first image
      const base64Image = data.generatedImages[0].image.data;
      const imageName = `imagen-${v4()}.png`;
      const imagePath = `./public/images/${imageName}`;
      
      // Ensure directory exists
      const dir = './public/images';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Save image to file
      const buffer = Buffer.from(base64Image, 'base64');
      fs.writeFileSync(imagePath, buffer);
      
      // Return the relative URL
      return `/images/${imageName}`;
    }
    
    return "https://placehold.co/600x400";
  } catch (error) {
    console.log("❌ Error in generateHighQualityImageUrl", error);
    return "https://placehold.co/600x400";
  }
}

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);
  console.log("Found Image components: ", imageComponents.length);
  
  for (const component of imageComponents) {
    console.log("Generating Image for component: ", component.alt);
    
    // You can choose which generator to use based on quality needs
    // For highest quality (paid tier only):
    // component.content = await generateHighQualityImageUrl(component.alt || "Placeholder Image");
    
    // For standard quality (works with experimental model):
    component.content = await generateImageUrl(component.alt || "Placeholder Image");
    console.log("Image URL generated: ", component.content);
  }
}

export const generateLayoutsJson = async (outlineArray: string[]) => {
  const prompt = `### Guidelines
  You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
  Our final JSON output is a combination of layouts and elements. 
  The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", 
  "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", 
  "fourImageColumns", "tableLayout".
  The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", 
  "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider",
  "column"

  Use these outlines as a starting point for the content of the presentations 
    ${JSON.stringify(outlineArray)}

  The output must be an array of JSON objects.
    1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
    2. Ensuring each layout is unique.
    3. Adhere to the structure of existing layouts
    4. Fill placeholder data into content fields where required.
    5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
    6. Ensure proper formatting and schema alignment for the output JSON.
    7. First create LAYOUTS TYPES  at the top most level of the JSON output as follows ${JSON.stringify(
      [
        {
          slideName: "Blank card",
          type: "blank-card",
          className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
          content: {},
        },
      ]
    )}
    8.The content property of each LAYOUTS TYPE should start with "column" and within the columns content property you can use any 
    of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you 
    can have more elements inside them nested. Static elements like title and paragraph should have content set to a string.Here is 
    an example of what 1 layout with 1 column with 1 title inside would look like:
    ${JSON.stringify([
    {
      slideName: 'Blank card',
      type: 'blank-card',
      className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
      content: {
        id: v4(),
        type: 'column' as ContentType,
        name: 'Column',
        content: [
          {
            id: v4(),
            type: 'title' as ContentType,
            name: 'Title',
            content: '',
            placeholder: 'Untitled Card',
          },
        ],
      },
    },
  ])}
  9. Here is a final example of an example output for you to get an idea 
  ${JSON.stringify([
    {
      id: v4(),
      slideName: 'Blank card',
      type: 'blank-card',
      className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
      content: {
        id: v4(),
        type: 'column' as ContentType,
        name: 'Column',
        content: [
          {
            id: v4(),
            type: 'title' as ContentType,
            name: 'Title',
            content: '',
            placeholder: 'Untitled Card',
          },
        ],
      },
    },

    {
      id: v4(),
      slideName: 'Accent left',
      type: 'accentLeft',
      className: 'min-h-[300px]',
      content: {
        id: v4(),
        type: 'column' as ContentType,
        name: 'Column',
        restrictDropTo: true,
        content: [
          {
            id: v4(),
            type: 'resizable-column' as ContentType,
            name: 'Resizable column',
            restrictToDrop: true,
            content: [
              {
                id: v4(),
                type: 'image' as ContentType,
                name: 'Image',
                content:
                  'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'Title',
              },
              {
                id: v4(),
                type: 'column' as ContentType,
                name: 'Column',
                content: [
                  {
                    id: v4(),
                    type: 'heading1' as ContentType,
                    name: 'Heading1',
                    content: '',
                    placeholder: 'Heading1',
                  },
                  {
                    id: v4(),
                    type: 'paragraph' as ContentType,
                    name: 'Paragraph',
                    content: '',
                    placeholder: 'start typing here',
                  },
                ],
                className: 'w-full h-full p-8 flex justify-center items-center',
                placeholder: 'Heading1',
              },
            ],
          },
        ],
      },
    },
  ])}

  For Images 
    - The alt text should describe the image clearly and concisely.
    - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
    - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
    - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

    Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.`;

  try {
    console.log("Generating Layouts...");
    
    // Using Gemini instead of GPT
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });
    
    const result = await model.generateContent(prompt);
    const responseContent = result.response.text();
    
    if (!responseContent) {
      return { status: 400, error: 'No content generated' };
    }
    
    let jsonResponse;
    
    try {
      // Clean up the response to extract JSON
      jsonResponse = JSON.parse(responseContent.replace(/```json|```/g, ''));
      await Promise.all(jsonResponse.map(replaceImagePlaceholders));
    } catch (error) {
      console.log("Invalid JSON received: ", responseContent, error);
      return { status: 400, error: 'Invalid JSON generated' };
    }
    
    console.log("Layouts Generated Successfully");
    return { status: 200, data: jsonResponse };
  } catch (error) {
    console.error("Error in generateLayoutsJson", error);
    return { status: 500, error: "Error generating layouts" };
  }
}

export const generateLayoutsFromGemini = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: "Project ID is required" };
    }

    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "User not Authenticated" };
    }

    const userExist = await client.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!userExist || !userExist.subscription) {
      return { status: 403, error: !userExist ? "User not found" : "User has no subscription" };
    }

    const project = await client.project.findUnique({
      where: { id: projectId, isDeleted: false }
    });

    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    if (!project?.outlines || project.outlines.length === 0) {
      return { status: 400, error: "Project has no outlines" };
    }

    const layouts = await generateLayoutsJson(project?.outlines);

    if (!layouts?.data || layouts.status !== 200) {
      return { status: 500, error: "Error generating layouts" };
    }

    await client.project.update({
      where: { id: projectId },
      data: { slides: layouts.data, themeName: theme }
    });
    
    return { status: 200, data: layouts.data };
  } catch (error) {
    console.log("❌ Error in generateLayouts", error);
    return { status: 500, error: "Internal Server error" };
  }
}