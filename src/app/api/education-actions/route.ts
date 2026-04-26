import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { topic, language, questionsAndAnswers } = await request.json()

    if (!topic || !language || !questionsAndAnswers) {
       return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a Clinical Decision Support Co-pilot for ASHA frontline workers.
Your task is to review the user's answers to triage questions regarding a specific health topic and provide a list of immediate, concrete medical actions or recommendations.
Crucially, you must provide the content in the requested regional language (${language}) AND provide an English translation alongside it for reference.

Always respond in this exact JSON format:
{
  "summaryLocal": "A one-sentence summary of the assessment in ${language}",
  "summaryEnglish": "English translation of the summary",
  "actions": [
    {
      "actionLocal": "A specific, concrete next step or recommendation in ${language}",
      "actionEnglish": "English translation of the action"
    }
  ],
  "requiresReferral": true or false
}
`

    const userMessage = `
Topic: ${topic}
Language: ${language}
Triage Questions and Answers:
${JSON.stringify(questionsAndAnswers, null, 2)}
`

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    let parsed
    try {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1])
      } else {
        parsed = JSON.parse(text)
      }
    } catch {
      console.error("Failed to parse Gemini output:", text)
      parsed = {
        summaryLocal: "Error generating actions.",
        summaryEnglish: "Error generating actions.",
        actions: [{ actionLocal: "Please try again.", actionEnglish: "Please try again." }],
        requiresReferral: false
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Education actions route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
