import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
            <a href="/">
                <img
                src="https://seeklogo.com/images/T/ticket-logo-8E95290676-seeklogo.com.png"
                alt="Logo"
                />
            </a>
            </div>
            <div className="title" style={{fontFamily:'unset'}}>
                <h1>Real Time Event Ticketing System</h1>
            </div>
            <div className="login">
                <Link to="/login" className="login-link">Login</Link>
            </div>
        </header>
    );
};

export default Header;
