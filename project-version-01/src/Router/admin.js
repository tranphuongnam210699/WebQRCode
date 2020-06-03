import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import component
import ProductList from "../Page/Products/ProductList";
import Home from "../components/Home";
import AddProduct from "../Page/Products/AddProduct";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Categories from "../Page/Categories/Categories";
import EditProduct from "../Page/Products/EditProduct";
import AddCategory from "../Page/Categories/AddCategory";
import EditCategory from "../Page/Categories/EditCategory";
import Producer from "../Page/Producer/Producers";
import AddProducer from "../Page/Producer/AddProducer";
import EditProducer from "../Page/Producer/EditProducer";
import Order from "../Page/Order";
import Bill from "../Page/Bill/Bill";
import BillDetail from "../Page/Bill/BillDetail";
import AddProductWithExcel from "../Page/Products/AddProductWithExcel";

export default class Admin extends Component {
    handleInputURL = (accountType, match) => {
        if (accountType == 0) {
            return (
                <div>
                    <Route path={`${match}`} exact component={Home} />
                    <Route
                        path={`${match}/products`}
                        exact
                        component={ProductList}
                    />
                    <Route
                        path={`${match}/addProduct`}
                        exact
                        component={AddProduct}
                    />
                    <Route
                        path={`${match}/importWithExcel`}
                        exact
                        component={AddProductWithExcel}
                    />
                    <Route
                        path={`${match}/editProduct`}
                        exact
                        component={EditProduct}
                    />
                    <Route
                        path={`${match}/categories`}
                        exact
                        component={Categories}
                    />
                    <Route
                        path={`${match}/addCategory`}
                        exact
                        component={AddCategory}
                    />
                    <Route
                        path={`${match}/editCategory`}
                        exact
                        component={EditCategory}
                    />
                    <Route
                        path={`${match}/producer`}
                        exact
                        component={Producer}
                    />
                    <Route
                        path={`${match}/addProducer`}
                        exact
                        component={AddProducer}
                    />
                    <Route
                        path={`${match}/editProducer`}
                        exact
                        component={EditProducer}
                    />
                    <Route path={`${match}/order`} exact component={Order} />
                    <Route path={`${match}/bill`} exact component={Bill} />
                    <Route path={`${match}/billDetail`} exact component={BillDetail} />
                </div>
            );
        }
        // switch (accountType) {
        //     case 0:
        //
        //         break;

        //     default:
        //         break;
        // }
    };

    render() {
        const match = this.props.match.path;
        const accountType = localStorage.getItem("accountType");
        return (
            <Router>
                <div>
                    <Navbar />
                    <div className="body_wrapper d-flex">
                        <div className="Sidebar">
                            <Sidebar match={match} />
                        </div>
                        <div className="Content">
                            {this.handleInputURL(accountType, match)}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
