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

const TONE: Record<string, string> = {
  High: "border-red-700 bg-red-50 text-red-700",
  Medium: "border-amber-700 bg-amber-50 text-amber-700",
  Low: "border-emerald-700 bg-emerald-50 text-emerald-700",
};

const LABEL: Record<string, string> = {
  High: "High risk",
  Medium: "Be careful",
  Low: "Looks legitimate",
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
  const navigate = useNavigate();
  const res = mockResult;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 bg-[radial-gradient(60%_45%_at_50%_0%,#e6e4ff,transparent_70%)]">
      <header className="mx-auto w-full max-w-3xl px-5 pt-5">
        <span className="inline-flex items-center gap-2 font-extrabold">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
            className="text-teal-700"
          >
            <path
              d="M12 218 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11v5z"
              fill="currentColor"
            />
          </svg>
          Opportunity Shield
        </span>
      </header>
      <main className="mx-auto w-full max-w-3xl space-y-6 px-5 py-8">
        <button
          onClick={() => navigate("/")}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold transition hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          <ArrowBigLeft size={18} aria-hidden="true" /> Check another
          opportunity{" "}
        </button>
        <div>
          <p className="text-sm text-slate-600"> {res.organization} </p>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {" "}
            {res.opportunityName}{" "}
          </h1>
        </div>

        <section
          role="status"
          className={`rounded-3xl border-l-8 p-5 ${TONE[res.riskLevel]}`}
        >
          <div className="flex items-end justify-between gap-4">
            <p className="text-3xl font-extrabold leading-tight">
              {LABEL[res.riskLevel]}{" "}
            </p>
            <p className="text-3xl font-extrabold tabular-nums">
              {" "}
              {res.riskScore}{" "}
              <span className="text-base font-semibold">/100</span>{" "}
            </p>
          </div>

          <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/70"
            role="meter"
            aria-valuenow={res.riskScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Risk score"
          >
            <div
              className="h-full rounded-full bg-current"
              style={{ width: `${res.riskScore}%` }}
            ></div>
          </div>
          <p className="mt-3 text-slate-900">
            {res.summary}{" "}
            <span className="text-slate-600">
              {" "}
              Confidence: {res.confidence}{" "}
            </span>
          </p>
        </section>

        {res.warningSignals.length > 0 && (
          <section className={card}>
            <h2 className="font-bold">Warning signs</h2>
            <SignalList items={res.warningSignals} kind="bad" />
          </section>
        )}

        {res.positiveSignals.length > 0 && (
          <section className={card}>
            <h2 className="font-bold">What looked fine</h2>
            <SignalList items={res.positiveSignals} kind="ok" />
          </section>
        )}

        {res.evidence.length > 0 && (
          <section className={card}>
            <h2 className="font-bold">Evidence</h2>
            <ul className="mt-3 space-y-2">
              {res.evidence.map((ev) => (
                <li
                  key={ev}
                  className="border-l-4 border-slate-200 pl-4 text-slate-600"
                >
                  {ev}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-3xl bg-teal-50 p-5">
          <h2 className="font-bold text-teal-600">What should you do?</h2>
          <p className="mt-2"> {res.recommendation} </p>
        </section>

        <p className="text-center text-sm text-slate-600">
          Automated analysis can be wrong. Use it as a guide, not a guarantee.
        </p>
      </main>
    </div>
  );
}

export default Result;
