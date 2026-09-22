export interface AnalysisResult {
    opportunityName: string;
    organization: string;
    riskScore: number;
    riskLevel: string;
    confidence: string;
    summary: string;
    positiveSignals: string[];
    warningSignals: string[];
    evidence: string[];
    recommendation: string;
}