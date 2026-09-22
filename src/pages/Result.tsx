import type { AnalysisResult } from "../types/opportunity";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const mockResult: AnalysisResult = {
  opportunityName: "Tech Future Internship",
  organization: "UNICEF",
  riskScore: 72,
  riskLevel: "High",
  confidence: "Medium",
  summary: "Several warning signs were identified with this opportunity.",
  positiveSignals: ["Organization website was found"],
  warningSignals: ["Registration fee requested", "Urgency language detected"],
  evidence: ["The application requests payment before submission."],
  recommendation:
    "Verify the opportunity through the organization's official channels before submitting personal information.",
};
function Result() {
    const navigate = useNavigate()
  return (
    <>
      <button onClick={() => navigate("/")}>
        <ArrowBigLeft /> Analyze another opportunity{" "}
      </button>
      <p> {mockResult.opportunityName} </p>
      <p> {mockResult.organization} </p>

      <div className="flex flex-col gap-2 justify-center items-center">
        <div> {mockResult.riskScore} </div>
        <div> {mockResult.riskLevel} RISK </div>
        <div> {mockResult.confidence} confidence </div>{" "}
      </div>
      <span>Summary:</span>
      <p> {mockResult.summary} </p>
      <span> ☑️✓ Positive signals </span>
       {mockResult.positiveSignals.map(signal => (
        <p key={signal}> {signal} </p>
      ))} 
      <span> ⚠️ Warning signs </span>
      {mockResult.warningSignals.map(signal => (
        <p key={signal}> {signal} </p>
      ))} 
      <span> 🔎 Evidence </span>
     {mockResult.evidence.map(evidence => (
        <p key={evidence}> {evidence} </p>
      ))}

      <div className="mt-5"> What should you do?</div>
      <p> {mockResult.recommendation} </p>

      <button onClick={() => navigate("/")} className="mt-10 border rounded-xl cursor-pointer">Check another opportunity</button>
    </>
  );
}

export default Result;
