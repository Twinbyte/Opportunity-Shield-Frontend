import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>404</h1>
            <p>Page not found.</p>
            <button className="border border-slate-700 cursor-pointer" onClick={() => navigate('/')}> Back to home</button>
        </div>
    )
}

export default NotFound