import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

import iconLogo from "../../asset/iconSVG/star-market.svg";

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar d-flex justify-content-between align-items-center">
                {/* <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <div className="container">
                    </div>
                </nav> */}
                <div className="logo">
                    <Link to="/">
                        <span>ST - Market</span>
                    </Link>
                </div>
                <div className='rightNav'>
                    <span>LogOut</span>
                </div>
            </div>
        );
    }
}
