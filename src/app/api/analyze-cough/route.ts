import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { coughType, duration } = await request.json()

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are an AI Acoustic Respiratory Assessment tool. 
Your task is to analyze described cough characteristics and generate a "Lung Health Index" triage report.

Always respond in this exact JSON format:
{
  "index": "Low Risk" | "Medium Risk" | "High Risk",
  "score": 0-100,
  "analysis": "A brief 2-sentence clinical explanation of the analysis based on acoustic properties",
  "recommendation": "Triage recommendation for the ASHA worker"
}
`

    const userMessage = `Analyze this simulated cough recording:
Type/Sound: ${coughType}
Duration/Frequency: ${duration}
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
      parsed = {
        index: 'Medium Risk',
        score: 50,
        analysis: 'Unable to process acoustic data clearly.',
        recommendation: 'Perform manual respiratory assessment.'
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Analyze cough route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
