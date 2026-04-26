import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { inventoryData } = await request.json()

    if (!inventoryData) {
       return NextResponse.json({ message: 'Inventory data required.' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a Supply Chain AI for frontline healthcare workers.
Analyze the provided current inventory and weekly usage data to predict stock-outs and recommend reorder amounts.

Always respond in this exact JSON format:
{
  "predictions": [
    {
      "itemId": "string (match input ID)",
      "status": "Safe" | "Warning" | "Critical",
      "daysUntilStockout": number,
      "recommendedReorder": number,
      "reason": "Brief explanation"
    }
  ],
  "summary": "One sentence overall supply chain health summary"
}
`

    const userMessage = `Analyze this inventory: ${JSON.stringify(inventoryData)}`

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
        predictions: [],
        summary: "Error predicting supply chain needs."
      }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Supply chain route error:', err)
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
