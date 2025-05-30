// Types for Gemini response structure

export interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: {
                text?: string
            }[]
        }
    }[]
}
