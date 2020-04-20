import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "antd/dist/antd.css";
// import component
import ProductList from "./Page/Products/ProductList";
import Home from "./components/Home";
import AddProduct from "./Page/Products/AddProduct";
// import QRCode from './components/QRCode';
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Categories from "./Page/Categories/Categories";
import EditProduct from "./Page/Products/EditProduct";
import AddCategory from "./Page/Categories/AddCategory";
import EditCategory from "./Page/Categories/EditCategory";
import Producer from './Page/Producer/Producers';
import AddProducer from './Page/Producer/AddProducer';
import EditProducer from './Page/Producer/EditProducer';
import Order from "./Page/Order/Order";

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
                        <Route
                            path="/editProduct"
                            exact
                            component={EditProduct}
                        />
                        <Route
                            path="/categories"
                            exact
                            component={Categories}
                        />
                        <Route
                            path="/addCategory"
                            exact
                            component={AddCategory}
                        />
                        <Route
                            path="/editCategory"
                            exact
                            component={EditCategory}
                        />
                        <Route
                            path="/producer"
                            exact
                            component={Producer}
                        />
                        <Route
                            path="/addProducer"
                            exact
                            component={AddProducer}
                        />
                        <Route
                            path="/editProducer"
                            exact
                            component={EditProducer}
                        />
                        <Route
                            path="/order"
                            exact
                            component={Order}
                        />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
