import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "antd/dist/antd.css";


import ScanQrCode from "../Page/ScanQRCode/ScanQRCode";
import Admin from "./admin";
import Home from "../Page/Home";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route
                        path="/admin"
                        component={({ match }) => <Admin match={match} />}
                    />
                    <Route path="/scanQRCode" exact component={ScanQrCode} />
                </Switch>
            </Router>
        );
    }
}

export default App;
