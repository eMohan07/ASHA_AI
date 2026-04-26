import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { topic, language } = await request.json()

    if (!topic || !language) {
       return NextResponse.json({ message: 'Topic and language required.' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a Localized Health Education Co-pilot for ASHA frontline workers.
Your task is to provide structured health education prompts and guidance based on a given topic.
Crucially, you must provide the content in the requested regional language (${language}) AND provide an English translation alongside it for reference.

Always respond in this exact JSON format:
{
  "title": "Title of the topic in ${language}",
  "titleEnglish": "Title of the topic in English",
  "guidance": [
    {
      "pointLocal": "A specific educational point or advice in ${language}",
      "pointEnglish": "The English translation of that point"
    }
  ],
  "questionsToAsk": [
    {
      "qLocal": "A triage question to ask the patient in ${language}",
      "qEnglish": "The English translation of the question"
    }
  ]
}
`

    const userMessage = `Generate health education content for the topic: "${topic}" in the language: "${language}".`

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
        title: "Error Generating Content",
        titleEnglish: "Error Generating Content",
        guidance: [{ pointLocal: "Please try again.", pointEnglish: "Please try again." }],
        questionsToAsk: []
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Education route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
