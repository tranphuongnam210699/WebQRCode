import React, { Component } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar d-flex flex-column align-items-center">
                <Link to="/products" className="nav-link">
                    Product
                </Link>
                <Link to="/categories" className="nav-link">
                    Categories
                </Link>
            </div>
        );
    }
}
