import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import route from "./routes/route";

function App() {
    return (
        <Router>
            <Routes>
                {route.map((r, index) => (
                    <Route key={index} path={r.path} element={r.element} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
