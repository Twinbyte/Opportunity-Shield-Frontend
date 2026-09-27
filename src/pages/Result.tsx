import { type ProgressStep, type AnalysisResult } from "../types/opportunity";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnalysis } from "../services/opportunityApi";
import { ArrowLeft } from "lucide-react";
import { Check, LoaderCircle, Clock3 } from "lucide-react";

const TONE: Record<string, string> = {
  high: "border-red-700 bg-red-50 text-red-700",
  medium: "border-amber-700 bg-amber-50 text-amber-700",
  low: "border-emerald-700 bg-emerald-50 text-emerald-700",
  unableToVerify: "border-slate-700 bg-slate-50 text-slate-700",
};

const LABEL: Record<string, string> = {
  high: "High risk",
  medium: "Be careful",
  low: "Looks legitimate",
  unableToVerity: "Unable to verify",
};

const card =
  "rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_-20px_rgba(15,118,110,0.28)] sm:p-6";

function SignalList({ items, kind }: { items: string[]; kind: "bad" | "ok" }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${kind === "bad" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}
          >
            {kind === "bad" ? "!" : "✓"}
          </span>
          <span> {item} </span>
        </li>
      ))}
    </ul>
  );
}

function Result() {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (!analysisId) return;

    const fetchResult = async () => {
      const data = await getAnalysis(analysisId);
      setIsLoading(false);
      // console.log("STATUS:", data.status);
      // console.log("FULL DATA:", data);
      if (data.status === "pending" || data.status === "processing") {
        // console.log("SETTING PROCESSING TRUE")
        setProgressSteps(data.progressSteps ?? []);
        setIsProcessing(true);

        setTimeout(() => {
          fetchResult();
        }, 1000);
      } else if (data.status === "completed") {
        setAnalysis(data.result);
        setIsProcessing(false);
      } else if (data.status === "failed") {
        setError(data.error?.message || "Something went wrong");
        setIsProcessing(false);
      }
      // console.log(data);
      // console.log("STATUS:", data.status);
      // console.log("steps:", data.progressSteps);
    };

    fetchResult();
  }, [analysisId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen ...">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <LoaderCircle className="mx-auto h-7 w-7 animate-spin" />
            <p className="mt-3 text-sm text-slate-600">
              Loading your analysis...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Checking this opportunity...</h2>
            <p>
              We&apos;re analyzing the information you submitted. This may take
              a moment.
            </p>

            <div className="mt-6 space-y-4">
              {progressSteps.map((step) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm">
                    {step.status === "pending" ? (
                      <Clock3 />
                    ) : step.status === "in_progress" ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                      <Check />
                    )}
                  </span>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 bg-[radial-gradient(60%_45%_at_50%_0%,#e6e4ff,transparent_70%)]">
      <header className="mx-auto w-full max-w-3xl px-5 pt-5">
        <span className="inline-flex items-center gap-2 font-extrabold">
          {/* <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden="true"
              className="text-teal-700"
            >
              <path
                d="M12 2 3 5v6c0 5.5 3.8 9.9 9 11 5.2-1.1 9-5.5 9-11v5l-9-3z"
                fill="currentColor"
              />
            </svg> */}
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
            className="text-teal-700"
          >
            <path
              d="M12 2 3 5v6c0 5.5 3.8 9.9 9 11 5.2-1.1 9-5.5 9-11V5l-9-3z"
              fill="currentColor"
            />
          </svg>
          Opportunity Shield
        </span>
      </header>
      <main className="mx-auto w-full max-w-3xl space-y-6 px-5 py-8">
        <button
          aria-label="Back to home"
          onClick={() => navigate("/")}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold transition hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          <ArrowLeft size={18} aria-hidden="true" /> Check another
          opportunity{" "}
        </button>
        <div>
          <p className="text-sm text-slate-600"> {analysis.organization} </p>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {" "}
            {analysis.opportunityName}{" "}
          </h1>
        </div>

        <section
          role="status"
          className={`rounded-3xl border-l-8 p-5 ${TONE[analysis.riskLevel]}`}
        >
          <div className="flex items-end justify-between gap-4">
            <p className="text-3xl font-extrabold leading-tight">
              {LABEL[analysis.riskLevel]}
            </p>
          </div>

          {analysis.trustScore !== null && (
            <p className="text-3xl font-extrabold tabular-nums">
              {" "}
              {analysis.trustScore}{" "}
              <span className="text-base font-semibold">/100</span>{" "}
            </p>
          )}
          {analysis.trustScore !== null && (
            <div
              className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/70"
              role="meter"
              aria-valuenow={analysis.trustScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Trust score"
            >
              <div
                className="h-full rounded-full bg-current"
                style={{ width: `${analysis.trustScore}%` }}
              />
            </div>
          )}

          <p className="mt-3 text-slate-900">
            {analysis.summary}{" "}
            <span className="text-slate-600">
              {" "}
              Confidence: {analysis.confidence}{" "}
            </span>
          </p>
        </section>

        {analysis.warningSignals.length > 0 && (
          <section className={card}>
            <h2 className="font-bold">Warning signs</h2>
            <SignalList items={analysis.warningSignals} kind="bad" />
          </section>
        )}

        {analysis.positiveSignals.length > 0 && (
          <section className={card}>
            <h2 className="font-bold">What looked fine</h2>
            <SignalList items={analysis.positiveSignals} kind="ok" />
          </section>
        )}

        {analysis.evidence.length > 0 && (
          <section className={card}>
            <h2 className="font-bold">Evidence</h2>
            <ul className="mt-3 space-y-2">
              {/* {analysis.evidence.map((id))} */}
              {analysis.evidence.map((ev) => (
                <li
                  key={ev.detail}
                  className="border-l-4 border-slate-200 pl-4 text-slate-600"
                >
                  {ev.detail}
                  {/* {ev.impact} */}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-3xl bg-teal-50 p-5">
          <h2 className="font-bold text-teal-600">What should you do?</h2>
          <p className="mt-2"> {analysis.recommendation} </p>
        </section>

        <p className="text-center text-sm text-slate-600">
          Automated analysis can be wrong. Use it as a guide, not a guarantee.
        </p>
      </main>
    </div>
  );
}

export default Result;
