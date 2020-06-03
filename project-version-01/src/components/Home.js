import React, { Component } from "react";
import Clock from "react-live-clock";
import './Home.scss'


export default class Home extends Component {
    render() {
        return (
            <div className="homeAdmin d-flex flex-column justify-content-center align-items-center">
                <span>Hello {localStorage.getItem("displayName")}</span>
                <span>
                    <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </span>
            </div>
        );
    }
}
