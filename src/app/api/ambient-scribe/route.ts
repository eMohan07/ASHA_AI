import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json()

    if (!transcript) {
       return NextResponse.json({ message: 'Transcript required.' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are an Ambient Scribing AI.
Extract structured clinical data from the raw conversational transcript provided by the frontline healthcare worker.

Always respond in this exact JSON format:
{
  "patientContext": "Brief summary of who the patient is (e.g. 5yo boy, pregnant mother)",
  "chiefComplaint": "The primary issue",
  "symptoms": ["symptom 1", "symptom 2"],
  "vitals": {
     "temperature": "string or null",
     "bloodPressure": "string or null",
     "other": "string or null"
  },
  "actionPlan": ["action 1", "action 2"]
}
`

    const userMessage = `Extract data from this transcript: "${transcript}"`

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
        patientContext: "Unknown",
        chiefComplaint: "Error parsing transcript.",
        symptoms: [],
        vitals: { temperature: null, bloodPressure: null, other: null },
        actionPlan: []
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Ambient scribe route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
