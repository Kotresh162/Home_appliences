import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import style from "./home_page.module.css";

function Homepage() {
    const navigate = useNavigate(); // Define navigate function

    return (
        <>
            {/* Header Section */}
            <header className={style["header"]}>
                <nav className={style["nav"]}>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#about">About Us</a></li>
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <div className={style["hero-section"]} id="home">
                <div className={style["hero-text"]}>
                    <h1>Welcome to Your Home Appliances Controller</h1>
                </div>
                {/* Fixed: Use navigate correctly */}
                <button onClick={() => navigate("/register")}>Sign Up</button>
            </div>

            {/* Features Section */}
            <div className={style["Feature"]} id="features">
                <h2>Features Section</h2>
            </div>

            {/* Cards Section */}
            <div className={style["cards"]} id="pricing">
                <h2>Pricing Section</h2>
            </div>

            {/* Footer Section */}
            <footer className={style["footer"]} id="about">
                <h2>About Us</h2>
            </footer>
        </>
    );
}

export default Homepage;
