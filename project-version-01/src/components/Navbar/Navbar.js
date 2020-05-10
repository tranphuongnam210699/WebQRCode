import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";


export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar d-flex justify-content-between align-items-center">
                <div className="logo">
                    <Link to="/admin">
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
