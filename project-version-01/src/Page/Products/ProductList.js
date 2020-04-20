import React, { Component } from "react";
import "./Products.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Popconfirm, message } from "antd";
var QRCode = require("qrcode.react");
var Barcode = require("react-barcode");

const text = "Are you sure to delete?";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            categories: [],
            producer: [],
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
        axios
            .get("http://localhost:5000/category")
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:5000/producer")
            .then((response) => {
                this.setState({ producer: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    showQRCODE = (result) => {
        if (result !== "") {
            return <QRCode value={result} renderAs="svg" />;
        }
    };

    deleteProduct = (id) => {
        axios
            .delete("http://localhost:5000/products/" + id)
            .then((res) => message.success("Deleted"));

        this.setState({
            product: this.state.product.filter((result) => result._id !== id),
        });
    };

    render() {
        const { product, categories, producer } = this.state;
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
                            const categoryName = categories.find(
                                (result) => result.id == contentProduct.LoaiID
                            );
                            const producerName = producer.find(
                                (result) => (result.id = contentProduct.NSXId)
                            );
                            console.log("categoryName", categoryName);
                            if (
                                categoryName != undefined &&
                                producerName != undefined
                            ) {
                                return (
                                    <div
                                        key={index}
                                        className="contentTable d-flex"
                                    >
                                        <div className="column1">
                                            <img
                                                src={
                                                    contentProduct.productImage
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="column2">
                                            <Link
                                                to={{
                                                    pathname: "/editProduct",
                                                    search: `?id=${contentProduct._id}`,
                                                }}
                                            >
                                                <span className="font-weight-bold">
                                                    {contentProduct.Name}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="column3">
                                            <span>
                                                {categoryName.CategoryName}
                                            </span>
                                        </div>
                                        <div className="column4">
                                            {this.showQRCODE(
                                                contentProduct.QRCode
                                            )}
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
                                            <span>{producerName.NSXName}</span>
                                        </div>
                                        <div className="column8">
                                            <span>{contentProduct.Price}</span>
                                        </div>
                                        <div className="column9 d-flex justify-content-between">
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                onConfirm={() => {
                                                    this.deleteProduct(
                                                        contentProduct._id
                                                    );
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <div className="iconDelete">
                                                    <CloseOutlined />
                                                </div>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
