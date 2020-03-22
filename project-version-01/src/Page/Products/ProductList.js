import React, { Component } from "react";
import "./Products.scss";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import axios from "axios";
var QRCode = require("qrcode.react");
var Barcode = require("react-barcode");

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: []
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:5000/products")
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        console.log(this.state.product);
        const { product } = this.state;
        return (
            <div>
                <div className="pageProductList">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="titleHeaderPage">
                            Products ({product.length})
                        </span>
                        <span className="buttonAdd">
                            <Link to="/addProduct">Add Product</Link>
                        </span>
                    </div>
                    <div className="table_wrapper">
                        <div className="titleHead d-flex">
                            <div className="column1">Image</div>
                            <div className="column2">Name</div>
                            <div className="column3">Loại</div>
                            <div className="column4">QRCode</div>
                            <div className="column5">BarCode</div>
                            <div className="column6">Description</div>
                            <div className="column7">NSX</div>
                            <div className="column8">Price</div>
                            <div className="column9"></div>
                        </div>
                        {product.map((contentProduct, index) => {
                            return (
                                <div
                                    key={index}
                                    className="contentTable d-flex"
                                >
                                    <div className="column1">
                                        <img
                                            src={contentProduct.Image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="column2">
                                        <span>{contentProduct.Name}</span>
                                    </div>
                                    <div className="column3">
                                        <span>{contentProduct.LoaiID}</span>
                                    </div>
                                    <div className="column4">
                                        <QRCode
                                            value={contentProduct.QRCode}
                                            renderAs="svg"
                                        />
                                    </div>
                                    <div className="column5" renderAs="svg">
                                        <Barcode
                                            value={contentProduct.BarCode}
                                        />
                                    </div>
                                    <div className="column6">
                                        <span>
                                            {contentProduct.Description}
                                        </span>
                                    </div>
                                    <div className="column7">
                                        <span>{contentProduct.NSXId}</span>
                                    </div>
                                    <div className="column8">
                                        <span>{contentProduct.Price}</span>
                                    </div>
                                    <div className="column9 d-flex">
                                        <div className="iconEdit">
                                            <EditOutlined />
                                        </div>
                                        <div className="iconDelete">
                                            <CloseOutlined />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
