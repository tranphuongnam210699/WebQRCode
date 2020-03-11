import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Navbar.scss';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            Home
                        </Link>
                        <div className="">
                            <ul className="navbar-nav d-flex flex-row justify-content-around align-items-center"
                                style={{width:"65vw"}}
                            >
                                <li className="navbar-item">
                                    <Link to="/products" className="nav-link">
                                        Product
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/addProduct" className="nav-link">
                                        Add Product
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/scanqrcode" className="nav-link">
                                        ScanQRCode
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
            </div>
        );
    }
}
