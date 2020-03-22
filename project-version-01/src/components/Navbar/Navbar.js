import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

import iconLogo from "../../Icon&Image/mall.svg";

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                {/* <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <div className="container">
                    </div>
                </nav> */}
                <div className="logo">
                    <Link to="/">
                        <img src={iconLogo} alt="" />
                    </Link>
                </div>
            </div>
        );
    }
}
