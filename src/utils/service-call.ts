import { GeminiResponse } from "../types/interface"
import axios from "axios"

const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY
const GEMINI_API_URL = import.meta.env.VITE_APP_GEMINI_API_URL

const GEMINI_ENDPOINT = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`

// Fetch suggestions
export const fetchSuggestions = async (input: string): Promise<string[]> => {
    const response = await axios.post<GeminiResponse>(GEMINI_ENDPOINT, {
        contents: [
            {
                parts: [
                    {
                        text: `Give 5 autocomplete suggestions for: "${input}" as a comma-separated list`,
                    },
                ],
            },
        ],
    })

    const raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text || ""
    return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
}

// Generate text
export const generateText = async (topic: string): Promise<string> => {
    const response = await axios.post<GeminiResponse>(GEMINI_ENDPOINT, {
        contents: [
            {
                parts: [
                    {
                        text: `Write a detailed article or paragraph about: "${topic}"`,
                    },
                ],
            },
        ],
    })

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

// Generate summary
export const generateSummary = async (text: string): Promise<string> => {
    const response = await axios.post<GeminiResponse>(GEMINI_ENDPOINT, {
        contents: [
            { parts: [{ text: `Summarize the following text: "${text}"` }] },
        ],
    })

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || ""
}
