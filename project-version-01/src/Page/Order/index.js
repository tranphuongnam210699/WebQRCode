import React, { Component } from "react";
import "./Order.scss";
import axios from "axios";
import {message} from 'antd'

// import component
import HeaderPage from "./HeaderPage";
import SearchProduct from "./SearchProduct";
import OrderProduct from "./OrderProduct";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            orderList: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                this.setState({ product: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addToListOrder = (productName, barCode, valueQuantity, price) => {
        let listOrder = this.state.orderList;
        if (valueQuantity == 1) {
            if (listOrder.length > 0) {
                const isChecked = listOrder.some(
                    (result) => result.barcode.toString() == barCode.toString()
                );
                if (isChecked == true) {
                    const index = listOrder.findIndex(
                        (result) => result.barcode == barCode
                    );
                    listOrder[index].quantity += parseInt(valueQuantity);
                    listOrder[index].total += parseInt(price) * parseInt(valueQuantity);
                } else if (isChecked == false) {
                    const total = parseInt(price) * parseInt(valueQuantity);
                    listOrder.push({
                        productName: productName,
                        barcode: barCode,
                        quantity: valueQuantity,
                        price: price,
                        total: total,
                    });
                }
            } else {
                listOrder.push({
                    productName: productName,
                    barcode: barCode,
                    quantity: 1,
                    price: price,
                    total: parseInt(price),
                });
            }
        } else if (valueQuantity > 1) {
            if (listOrder.length > 0) {
                const isChecked = listOrder.some(
                    (result) => result.barcode.toString() == barCode.toString()
                );
                if (isChecked == true) {
                    const index = listOrder.findIndex(
                        (result) => result.barcode == barCode
                    );
                    listOrder[index].quantity += parseInt(valueQuantity);
                    listOrder[index].total += parseInt(price) * parseInt(valueQuantity);
                } else if (isChecked == false) {
                    const total = parseInt(price) * parseInt(valueQuantity);
                    listOrder.push({
                        productName: productName,
                        barcode: barCode,
                        quantity: valueQuantity,
                        price: price,
                        total: total,
                    });
                }
            } else {
                const total = parseInt(price) * parseInt(valueQuantity);
                listOrder.push({
                    productName: productName,
                    barcode: barCode,
                    quantity: valueQuantity,
                    price: price,
                    total: total,
                });
            }
        }
        this.setState({
            orderList: listOrder,
        });
    };

    deleteProductOnListOrder = (index) => {
        const { orderList } = this.state;
        let remove = orderList.splice(index, 1);
        this.setState({
            orderList,
        });
    };

    deleteArray = () => {
        const { orderList } = this.state
        if(orderList.length > 0){
            // message.success("Deleted All");
            this.setState({
                orderList: []
            })
        }
        else{
            message.error("No Value");
        }
    }

    render() {
        const { orderList } = this.state;
        return (
            <div className="pageOrder_wrapper">
                <HeaderPage />
                <div className="contentpage d-flex">
                    <SearchProduct
                        productList={this.state.product}
                        addToListOrder={this.addToListOrder}
                    />
                    <OrderProduct
                        orderList={orderList}
                        productList={this.state.product}
                        addToListOrder={this.addToListOrder}
                        deleteProductOnListOrder={this.deleteProductOnListOrder}
                        deleteArray={this.deleteArray}
                    />
                </div>
            </div>
        );
    }
}
