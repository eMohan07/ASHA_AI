import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request: Request) {
  try {
    const { imageBase64, mimeType } = await request.json()

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) return NextResponse.json({ message: 'API key not configured.' }, { status: 500 })

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            image: imageBase64,
          },
          {
            type: 'text',
            text: `You are a clinical nutrition expert. Analyze this food image and identify all visible food items.
For each item provide realistic calorie estimates using standard nutritional data (USDA/ICMR values).
Respond ONLY with valid JSON in this exact format:
{
  "items": [
    { "food": "Food Name", "estimatedWeight": 150, "caloriesPer100g": 130, "totalCalories": 195, "confidence": "high|medium|low" }
  ],
  "totalCalories": 195,
  "note": "Brief note about estimation accuracy"
}
estimatedWeight is in grams. Be realistic and conservative. If image is unclear, set confidence to "low".`,
          }
        ]
      }]
    })

    let parsed
    try {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      parsed = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(text)
    } catch {
      parsed = { items: [], totalCalories: 0, note: 'Could not parse food items from image.' }
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Food photo analyze error:', err)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
