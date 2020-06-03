import React, { Component } from "react";

import {
    ShoppingCartOutlined,
    CloseOutlined,
    CloseSquareOutlined,
} from "@ant-design/icons";
import { message, Select } from "antd";
import axios from "axios";

import iconBarCode from "../../asset/iconSVG/bar-code-scan.svg";

const { Option } = Select;

export default class OrderProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderProductOrder: [],
            inputBarCode: "",
            valueQuantity: 1,
        };
    }

    componentDidMount() {
        const { productList } = this.props;
        this.setState({
            renderProductOrder: productList,
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (
            props.productList.toString() != state.renderProductOrder.toString()
        ) {
            return { renderProductOrder: props.productList };
        } else return null;
    }

    onChangeValueQuantity = (e) => {
        this.setState({
            valueQuantity: e,
        });
    };

    onChangeValueInputBarCode = (e) => {
        this.setState({ inputBarCode: e.target.value });
    };

    onAddProduct = (barCode) => {
        const { addToListOrder } = this.props;
        const { valueQuantity, renderProductOrder } = this.state;
        if (barCode == null || barCode == "" || barCode == undefined) {
            message.error("BarCode No Value");
        } else {
            const renderProduct = renderProductOrder.find(
                (product) => product.BarCode == barCode
            );
            if (
                renderProduct != "" &&
                renderProduct != null &&
                renderProduct != undefined
            ) {
                addToListOrder(
                    renderProduct.Name,
                    renderProduct.BarCode,
                    valueQuantity,
                    renderProduct.Price
                );
            } else {
                message.error("No Data! Please check again");
            }
        }
        this.setState({
            valueQuantity: 1,
            inputBarCode: "",
        });
    };
    deleteProduct = (index) => {
        const { deleteProductOnListOrder } = this.props;
        if (index != null && index != undefined && index >= 0) {
            deleteProductOnListOrder(index);
        }
        message.success("Deleted");
    };
    sumProperty = (arr, type) => {
        if (arr.length > 0) {
            return arr.reduce((total, obj) => {
                if (typeof obj[type] === "string") {
                    return total + Number(obj[type]);
                }
                return total + obj[type];
            }, 0);
        }
    };

    renderTotalAmount = (total) => {
        if (total > 0) {
            console.log();
            return <span>{Number(total).toLocaleString("es-ES")} VNĐ</span>;
        } else {
            return <span>0 VNĐ</span>;
        }
    };

    addToBill = (quantity, total, orderList) => {
        const date = new Date();
        const letToDay =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        if (quantity > 0) {
            const newBill = {
                quantity: quantity,
                total: total,
                idCus: 0,
                date: letToDay,
            };
            axios
                .post("http://localhost:5000/bill/add", newBill)
                .then((req, res) => this.addToBillDetail());
        } else message.error("No product is payment");
    };

    addToBillDetail = () => {
        const { orderList, deleteArray } = this.props;
        axios
            .get("http://localhost:5000/bill/getIdBillNew")
            .then(function (req) {
                return orderList.map((result, index) => {
                    const { barcode, quantity, price, total } = result;
                    const newBill = {
                        idBill: req.data[0]._id,
                        barCode: barcode,
                        quantity: quantity,
                        price: price,
                        total: total,
                    };
                    axios.post("http://localhost:5000/billDetail/add", newBill);
                });
            });
        message.success("Done");
        deleteArray();
    };

    render() {
        const { orderList, deleteArray } = this.props;
        const { valueQuantity, inputBarCode } = this.state;
        let totalAmount = this.sumProperty(orderList, "total");
        return (
            <div className="orderProduct_wrapper d-flex flex-column justify-content-between">
                <div>
                    <div className="topOrderProduct d-flex align-items-center">
                        <div className="shoppingBag d-flex align-items-center">
                            <div className="iconShoppingCart">
                                <ShoppingCartOutlined />
                            </div>
                            <span className="totalItems">{`${orderList.length} Items`}</span>
                        </div>
                        <div className="scanBarcode d-flex align-items-center">
                            <div className="iconBarcode">
                                <img src={iconBarCode} alt="" />
                            </div>
                            <div className="input">
                                <input
                                    placeholder="Scan BarCode"
                                    value={inputBarCode}
                                    onChange={this.onChangeValueInputBarCode}
                                />
                            </div>
                            <div className="buttonQuantity d-flex align-items-center justify-content-center">
                                <Select
                                    defaultValue={`${valueQuantity}`}
                                    value={`${valueQuantity}`}
                                    onChange={this.onChangeValueQuantity}
                                >
                                    <Option value="1">X1</Option>
                                    <Option value="2">X2</Option>
                                    <Option value="3">X3</Option>
                                    <Option value="4">X4</Option>
                                    <Option value="5">X5</Option>
                                    <Option value="6">X6</Option>
                                    <Option value="7">X7</Option>
                                    <Option value="8">X8</Option>
                                    <Option value="9">X9</Option>
                                    <Option value="10">X10</Option>
                                </Select>
                            </div>
                            <div
                                className="buttonAddProduct d-flex align-items-center"
                                onClick={() =>
                                    this.onAddProduct(inputBarCode.toString())
                                }
                            >
                                Add
                            </div>
                        </div>
                    </div>
                    <div className="productList_orderProduct">
                        <div className="titleHeaderTable d-flex">
                            <div className="column1">STT</div>
                            <div className="column2">Name</div>
                            <div className="column3">BarCode</div>
                            <div className="column4">Quantity</div>
                            <div className="column5">Total (VNĐ)</div>
                            <div className="column6"></div>
                        </div>
                        <div className="contentTable_wrapper">
                            {orderList.map((result, index) => {
                                return (
                                    <div
                                        className="contentTable d-flex"
                                        key={index}
                                    >
                                        <div className="column1">
                                            {index + 1}
                                        </div>
                                        <div className="column2 font-weight-bold">
                                            <span>{result.productName}</span>
                                        </div>
                                        <div className="column3">
                                            <span>{result.barcode}</span>
                                        </div>
                                        <div className="column4">
                                            <span>{result.quantity}</span>
                                        </div>
                                        <div className="column5">
                                            <span>
                                                {Number(
                                                    result.price *
                                                        result.quantity
                                                ).toLocaleString("el-GR")}
                                            </span>
                                        </div>
                                        <div className="column6">
                                            <div
                                                className="iconDelete d-flex align-items-center justify-content-center"
                                                onClick={() => {
                                                    this.deleteProduct(index);
                                                }}
                                            >
                                                <CloseOutlined />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="showTotal d-flex justify-content-end">
                        <span className="titleAmount d-flex align-items-center justify-content-center">
                            Amount
                        </span>
                        <span className="total d-flex justify-content-end align-items-center">
                            {this.renderTotalAmount(totalAmount)}
                        </span>
                    </div>
                </div>
                <div className="buttonEvent d-flex justify-content-end align-items-center">
                    <div
                        className="eventClear d-flex align-items-center justify-content-center"
                        onClick={() => {
                            deleteArray();
                        }}
                    >
                        <CloseSquareOutlined />
                        <span className="titleClear">Clear</span>
                    </div>
                    <div
                        className="eventPayment d-flex justify-content-between align-items-center"
                        onClick={() => {
                            this.addToBill(
                                orderList.length,
                                totalAmount,
                                orderList
                            );
                        }}
                    >
                        <span className="titlePay">Pay:</span>
                        <span className="contentPay">
                            {this.renderTotalAmount(totalAmount)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
