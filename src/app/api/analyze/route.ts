import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { foodData, symptomData } = await request.json()

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are ASHA AI, a clinical decision support assistant.
Your task is to analyze food intake and symptom severity data to provide a disease risk prediction and health report.

Always respond in this exact JSON format:
{
  "riskLevel": "Low" | "Moderate" | "High" | "Critical",
  "score": 0-100,
  "summary": "One sentence summary of the patient's condition",
  "correlations": ["correlation 1", "correlation 2"],
  "insights": ["insight 1", "insight 2"],
  "actionableSteps": ["step 1", "step 2"]
}
Keep language simple. Never diagnose.
`

    const userMessage = `
Food Intake:
${JSON.stringify(foodData)}

Symptoms Severity (0-10):
${JSON.stringify(symptomData)}
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
        riskLevel: 'Moderate',
        score: 50,
        summary: 'Error parsing AI response.',
        correlations: [],
        insights: [],
        actionableSteps: ['Please try again or consult a doctor manually.'],
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Analyze route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
