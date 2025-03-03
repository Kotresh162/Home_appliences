import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirect
import style from "./login_page.module.css";

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",   // Email instead of username
        password: "",
    });

    const [error, setError] = useState("");  // To handle error messages
    const [success, setSuccess] = useState("");  // To handle success messages

    const navigate = useNavigate();  // Initialize the navigate hook

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Login successful!");
                // Save the JWT token (if returned) in localStorage or sessionStorage
                localStorage.setItem("token", data.token);  // You can use sessionStorage if you prefer
                // Redirect to the /dashboard route
                navigate("/dashbord");  // Redirect to the EnergyDashboard component
            } else {
                setError(data.message || "Login failed.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={style["login-container"]}>
            <h2>Sign In</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if any */}
            {success && <p style={{ color: "green" }}>{success}</p>} {/* Show success message */}
            
            <form onSubmit={handleSubmit}>
                <input
                    className={style["name-box"]}
                    type="email"  // Ensure it is email input
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    className={style["password-box"]}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Log In</button>
            </form>
            
            <p>Don't have an account?</p>
            <a href="/register">Register here</a>
        </div>
    );
}
