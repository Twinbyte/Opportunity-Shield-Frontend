import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f5f5f5] px-5 py-30 h-screen mx-auto text-center">
      <div className="">
        <h1>404 Not Found</h1>
        <p className="mt-5 font-bold text-3xl">Oops! Page Not Found</p>
        <p className="mx-auto mt-4 max-w-[52ch] text-[#7c7c7c]">
          The page you are looking for doesn't exist.Let&apos;s get you back to
          the homepage.
        </p>
        <button
          className="border border-slate-700 cursor-pointer text-white bg-[#333333] hover:bg-[#232121] px-2 py-3 rounded-xl mt-10"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
