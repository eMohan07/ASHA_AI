import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { profile } = await request.json()

    if (!profile) {
       return NextResponse.json({ message: 'Patient profile required.' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a Digital Twin AI for maternal and child health.
Analyze the patient profile and generate a health trajectory: "Current State" vs "Optimized State" (if your advice is followed).

Always respond in this exact JSON format:
{
  "current": {
    "status": "string",
    "risks": ["risk 1", "risk 2"],
    "trajectory": "description of the likely outcome without intervention"
  },
  "optimized": {
    "status": "string",
    "benefits": ["benefit 1", "benefit 2"],
    "trajectory": "description of the improved outcome with intervention"
  },
  "advice": ["Specific nutrition advice", "Personalized care step"]
}
`

    const userMessage = `Analyze this profile: "${profile}"`

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
      parsed = {
        current: { status: "Unknown", risks: [], trajectory: "Inconclusive." },
        optimized: { status: "Unknown", benefits: [], trajectory: "Inconclusive." },
        advice: ["Please try again with more details."]
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Digital twin route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
