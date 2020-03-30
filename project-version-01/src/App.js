import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "antd/dist/antd.css";
// import component

import CreateUser from "./components/createUser";
import ProductList from "./Page/Products/ProductList";
import Home from "./components/Home";
import AddProduct from "./Page/Products/AddProduct";
// import QRCode from './components/QRCode';
import ScanQRCode from "./Page/ScanQRCode/ScanQRCdoe";
import Navbar from "./components/Navbar/Navbar";
import addImage from "./Page/test/addImage";
import Sidebar from "./components/Sidebar/Sidebar";
import Categories from "./Page/Categories/Categories";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="body_wrapper d-flex">
                <div className="Sidebar">
                    <Sidebar />
                </div>
                <div className="Content">
                    <div>
                        <Route path="/" exact component={Home} />
                        <Route path="/products" exact component={ProductList} />
                        <Route
                            path="/addProduct"
                            exact
                            component={AddProduct}
                        />
                        <Route path="/categories" exact component={Categories} />
                        <Route
                            path="/scanqrcode"
                            exact
                            component={ScanQRCode}
                        />
                        <Route path="/addImage" exact component={addImage} />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
