import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { content, title, currentScore } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      Optimize the following blog post content while maintaining its HTML structure. The current content score is ${currentScore}.
      Improve the content to achieve a higher score by:
      1. Expanding on existing points and adding relevant information.
      2. Adding or improving subheadings (using <h2>, <h3> tags).
      3. Improving keyword density (aim for 1-2.5%) by adding relevant keywords naturally.
      4. Suggesting image placements with <img> tags (use placeholder src).
      5. Enhancing the overall structure and flow.
      6. Adding transitional phrases between paragraphs.

      Maintain the existing HTML structure and add new elements as needed.

      Title: "${title}"

      Current content:
      ${content}

      Please provide the fully optimized content in HTML format, including the original content with improvements.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const optimizedContent = response.text();

    // Başlık optimizasyonu
    const titlePrompt = `
      Optimize the following title, keeping it concise and engaging (40-60 characters):
      "${title}"
    `;
    const titleResult = await model.generateContent(titlePrompt);
    const titleResponse = await titleResult.response;
    const optimizedTitle = titleResponse.text();

    return NextResponse.json({ content: optimizedContent, title: optimizedTitle });
  } catch (error) {
    console.error('Error optimizing content:', error);
    return NextResponse.json({ error: 'Failed to optimize content' }, { status: 500 });
  }
}