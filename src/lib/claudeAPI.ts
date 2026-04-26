// Calls our own /api/chat route (which then calls Claude securely)
export async function getSymptomAssessment(symptoms: string, patientContext: any = {}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms, patientContext }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get AI assessment')
  }

  return response.json()
}

export async function getRiskAssessment(foodData: any, symptomData: any) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ foodData, symptomData }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get risk assessment')
  }

  return response.json()
}


// Build the system prompt for the ASHA AI symptom checker
export function buildSystemPrompt() {
  return `You are ASHA AI, a clinical decision support assistant designed for frontline community health workers (ASHA workers) in rural India. 

Your role is to:
1. Listen to described symptoms carefully
2. Ask 1-2 focused follow-up questions if needed
3. Provide a clear triage assessment with severity level
4. Suggest practical next steps the health worker can take immediately
5. Indicate if the patient needs urgent referral to a PHC doctor

Always respond in this exact JSON format:
{
  "message": "Your conversational response to the health worker",
  "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "summary": "One sentence clinical summary",
  "nextSteps": ["step 1", "step 2", "step 3"],
  "referralNeeded": true | false,
  "referralReason": "Reason for referral if needed, else null"
}

Severity guidelines:
- LOW: Minor symptoms, home care is sufficient
- MEDIUM: Monitor closely, follow-up in 24-48 hours
- HIGH: Needs PHC visit within hours
- CRITICAL: Immediate emergency referral needed

Keep language simple. This worker may not have medical training.
Never diagnose. Always recommend professional evaluation for anything serious.`
}
