import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import history from "../../history";

export default class Navbar extends Component {
    handleDeleteLocalStorage = () => {
        localStorage.removeItem("displayName");
        localStorage.removeItem("accountType");
        history.push("/");
        window.location.reload();
    };

    render() {
        return (
            <div className="navbar d-flex justify-content-between align-items-center">
                <div className="logo">
                    <Link to="/admin">
                        <span>ST - Market</span>
                    </Link>
                </div>
                <Link
                    to="/"
                    className="rightNav"
                    onClick={() => {
                        this.handleDeleteLocalStorage();
                    }}
                >
                    <span>LogOut</span>
                </Link>
            </div>
        );
    }
}
