import React from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero">
                <h1>Welcome to RealTime Ticketing</h1>
                <p>Take control of your tasks and enhance efficiency with our intuitive and optimized ticketing solution.</p>
                <div className="cta">
                    <Link to="/avilable-tickets" className="btn-primary">
                        Buy Tickets
                    </Link>
                </div>
            </div>

        {/* Features Section */}
        <section id="features" className="features">
            <div className="feature-card">
                <img src="https://samaaro.com/wp-content/uploads/2024/03/MicrosoftTeams-image-330-1170x700.png" alt="Seamless Event Management" className="feature-image" />
                <h3>Seamless Event Management</h3>
                <p>Effortlessly organize events of any scale with tools designed to simplify complex tasks.</p>
            </div>
            <div className="feature-card">
                <img src="https://softhealer.com/theme_softhealer_website/static/src/img/images/event_management/sh_video_2.webp" alt="Dynamic Seat Selection" className="feature-image" />
                <h3>Dynamic Seat Selection</h3>
                <p>Offer customers the flexibility to choose their preferred seats with an interactive interface.</p>
            </div>
            <div className="feature-card">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240705124654/Real-time-analllytics.webp" alt="Real-Time Analytics" className="feature-image" />
                <h3>Real-Time Analytics</h3>
                <p>Monitor event performance and ticket sales with up-to-the-minute insights.</p>
            </div>
            <div className="feature-card">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKuKF01DfnU2rejpVOmdKdCXmkOQU5SA1vEQ&s" alt="Customizable Event Pages" className="feature-image" />
                <h3>Customizable Event Pages</h3>
                <p>Create branded event pages tailored to your specific requirements and themes.</p>
            </div>
            <div className="feature-card">
                <img src="https://arms.com/wp-content/uploads/2020/10/email-4539382_1920.jpg" alt="Automated Notifications" className="feature-image" />
                <h3>Automated Notifications</h3>
                <p>Keep users informed with instant updates about ticket status, schedules, and more.</p>
            </div>
            <div className="feature-card">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hd-0S_3vacFdiW-v5iV1XcsdRFE83Y8dvg&s" alt="Enhanced Security Measures" className="feature-image" />
                <h3>Enhanced Security Measures</h3>
                <p>Protect transactions and customer data with advanced encryption and fraud prevention.</p>
            </div>
        </section>


        </div>
    );
};

export default HomePage;
