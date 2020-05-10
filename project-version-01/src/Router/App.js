import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "antd/dist/antd.css";

import ScanQrCode from "../Page/ScanQRCode/ScanQRCode";
import RouterAdmin from "./routerAdmin";

function App() {
    return (
        <Router>
            <Switch>
                <Route
                    path="/admin"
                    component={({ match }) => <RouterAdmin match={match} />}
                />
                <Route path="/scanQRCode" exact component={ScanQrCode} />
            </Switch>
        </Router>
    );
}

export default App;
