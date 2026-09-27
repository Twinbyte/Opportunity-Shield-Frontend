export interface AnalysisResult {
    opportunityName: string;
    organization: string;
    trustScore: number | null;
    riskLevel: "low" | "medium" | "high" | "unableToVerify";
    confidence: "low" | "medium" | "high";
    summary: string;
    positiveSignals: string[];
    warningSignals: string[];
    evidence: Evidence[];
    recommendation: string;
}

export interface Evidence {
    type: string
    detail: string
    impact: string
}

export interface ProgressStep {
    label: string
    status: "pending" | "in_progress" | "done"
    updatedAt: string
}

export interface AnalysisResponse {
    analysisId: string
    status: "pending" | "processing" | "completed" | "failed"
    createdAt: string
    completedAt: string
    progressSteps: ProgressStep[] | null
    error: {
        code: string
        message: string
    } | null
    result: AnalysisResult | null

}

export type Mode = "url" | "text";
