import React, { Component } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {match} = this.props
        return (
            <div className="sidebar d-flex flex-column align-items-center">
                <Link to={`${match}/products`} className="nav-link">
                    Product
                </Link>
                <Link to={`${match}/categories`} className="nav-link">
                    Categories
                </Link>
                <Link to={`${match}/producer`} className="nav-link">
                    Producer
                </Link>
                <Link to={`${match}/order`} className="nav-link">
                    Order
                </Link>
            </div>
        );
    }
}
