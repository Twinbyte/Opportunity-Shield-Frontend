import axios from "axios"
import type { AnalysisResponse, Mode } from "../types/opportunity"

const BASE_URL = "https://opportunity-shield-api.onrender.com"

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
    const sessionId = localStorage.getItem("sessionId")

    if (sessionId) {
        config.headers["X-Session-Id"] = sessionId
    }

    return config
})

api.interceptors.response.use((response) => {
    const sessionId = response.headers["x-session-id"]

    if (sessionId) {
        localStorage.setItem("sessionId", sessionId)
    }

    return response
})

export async function createAnalysis(input: string, inputType: Mode) {
    const response = await api.post(`/api/v1/analyses`, {
        inputType: inputType,
        content: input,
    })

    return response.data
}

export async function getAnalysis(analysisId: string): Promise<AnalysisResponse> {
    const response = await api.get(`/api/v1/analyses/${analysisId}`)

    return response.data
}