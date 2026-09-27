import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnalysis } from "../services/opportunityApi";
import { type Mode } from "../types/opportunity";

function Home() {
  const [mode, setMode] = useState<Mode>("url");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const switchMode = (next: Mode) => {
    setMode(next);
    setInput("");
    setError("");
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError(
        mode === "url" ? "Paste a link to check" : "Paste the message to check",
      );
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const data = await createAnalysis(input, mode);
      const analysisId = data.analysisId;
      navigate(`/result/${analysisId}`);
    } catch (error) {
      console.error("Submission failed", error);
      setError("We couldn't finish this check. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabBase =
    "cursor-pointer rounded-full px-4.5 py-2 text-sm font-semibold";
  const tabOn = "bg-white text-slate-900 ring-1 ring-slate-200";
  const tabOff = "text-slate-600";
  const field =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-500 focus-visibility:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";

  return (
    <>
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

        <main className=" px-5 py-14 w-full max-w-3xl mx-auto text-center">
          <p className="inline-block rounded-full border border-slate-200 bg-white/75 px-3.5 py-1.5 text-sm font-semibold text-teal-700">
            Free scam check for job and scholarship offers
          </p>
          <h1 className="text-4xl md:text-5xl mt-5 font-extrabold leading-tight tracking-tight">
            Verify an Opportunity{" "}
            <span className="text-teal-700"> before you apply </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-balance text-lg text-slate-600">
            Paste an opportunity link or text below to check its legitimacy
            before applying.
          </p>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-8 max-w-160 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-[0_20px_50px_-20px_rgba(15,118,110,0.28)] sm:p-6"
          >
            <div
              className="inline-flex gap-1 rounded-full bg-slate-100 p-1"
              role="tablist"
              aria-label="What are you checking?"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === "url"}
                onClick={() => switchMode("url")}
                className={`${tabBase} ${mode === "url" ? tabOn : tabOff}`}
              >
                Paste URL
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "text"}
                onClick={() => switchMode("text")}
                className={`${tabBase} ${mode === "text" ? tabOn : tabOff}`}
              >
                Paste text
              </button>
            </div>

            <div className="mt-3">
              {mode === "url" ? (
                <input
                  className={field}
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (error) {
                      setError("");
                    }
                  }}
                />
              ) : (
                <textarea
                  className={`${field} min-h-32 resize-y`}
                  placeholder="Paste the email, WhatsApp message or job description"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (error) {
                      setError("");
                    }
                  }}
                ></textarea>
              )}
            </div>

            {error && (
              <p role="alert" className="mt-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-teal-700 px-6 py-3.5 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto "
              >
                {" "}
                {isLoading ? "Analyzing..." : "Analyze opportunity"}{" "}
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-slate-600">
            We only use what you paste for this check.
          </p>
        </main>
      </div>
    </>
  );
}

export default Home;
