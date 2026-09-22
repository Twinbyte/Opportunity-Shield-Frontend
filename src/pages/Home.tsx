import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("")
  const navigate = useNavigate()
//   const [showResult, setShowResult] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
        if (!input.trim()) {
          alert("Input field must not be empty")
          return
        }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Data submitted!");
      navigate("/result")
    //   setShowResult(true);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
          <h1 className="text-3xl text-center">
            Verify an Opportunity before you apply{" "}
          </h1>
          <p>
            Paste an opportunity link or text below to check its legitimacy
            before applying.
          </p>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Paste opportunity URL/text..." />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="max-w-md px-2 py-1 cursor-pointer border rounded-md bg-amber-400 text-white"
          >
            {isLoading ? (
              <span>
                {" "}
                <span></span> Analyzing...{" "}
              </span>
            ) : (
              "Analyze Opportunity"
            )}{" "}
          </button>
          <div>
            {isLoading ? (
              <div>
                <h2> 🔍 Analyzing opportunity...</h2>
                <p>
                  We're checking the information associated with this
                  opportunity.
                </p>
                ...
              </div>
            ) : (
              ""
            )}
          </div>
    </>
  )
}

export default Home;
