import React, { Component } from "react";
import "./Products.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Popconfirm, message, Modal } from "antd";
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
            visible: false,
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    hiddenContentDescription = (description) => {
        if (description.length > 140) {
            const str = description.slice(0, 140);
            
            const arrayDescription = description.split(";");
            return (
                <div>
                    <div className="contentDescription">
                        <span>{str.split(";").join('.')}... </span>
                        <a
                            onClick={this.showModal}
                            style={{
                                color: "#0A3F7F",
                                textDecoration: "underline #0A3F7F",
                                fontWeight: "bold",
                            }}
                        >
                            Xem chi tiết
                        </a>
                    </div>
                    <Modal
                        title="Description Detail"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <div className="d-flex flex-column">
                            {arrayDescription.map((content, index) => {
                                if (content.length > 0) {
                                    const arrayContent = content.split(":");
                                    return (
                                        <div key={index}>
                                            <span className="font-weight-bold">
                                                {arrayContent[0]}:
                                            </span>
                                            <span>{arrayContent[1]}</span>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </Modal>
                </div>
            );
        } else {
            return <span>{description}</span>;
        }
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
                            <Link to="/admin/addProduct">Add Product</Link>
                        </span>
                    </div>
                    <div className="table_wrapper">
                        <div className="titleHead d-flex">
                            <div className="column1">Image</div>
                            <div className="column2">Product</div>
                            <div className="column4">QRCode</div>
                            <div className="column5">BarCode</div>
                            <div className="column6">Description</div>
                            <div className="column8 d-flex justify-content-center">
                                Price
                            </div>
                            <div className="column9"></div>
                        </div>
                        <div className="contentTable_wrapper">
                            {product.map((contentProduct, index) => {
                                const categoryName = categories.find(
                                    (result) =>
                                        result.id == contentProduct.LoaiID
                                );
                                const producerName = producer.find(
                                    (result) =>
                                        result.id == contentProduct.NSXId
                                );
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
                                            <div className="column2 d-flex flex-column justify-content-between">
                                                <div className="topColumn2">
                                                    <Link
                                                        to={{
                                                            pathname:
                                                                "/admin/editProduct",
                                                            search: `?id=${contentProduct._id}`,
                                                        }}
                                                    >
                                                        <span className="font-weight-bold">
                                                            {
                                                                contentProduct.Name
                                                            }
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="bottomColumn2 d-flex flex-column">
                                                    <div>
                                                        <span className="font-weight-bold">
                                                            Category:
                                                        </span>
                                                        <span
                                                            style={{
                                                                marginLeft: 5,
                                                            }}
                                                        >
                                                            {
                                                                categoryName.CategoryName
                                                            }
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-weight-bold">
                                                            Producer:
                                                        </span>
                                                        <span
                                                            style={{
                                                                marginLeft: 5,
                                                            }}
                                                        >
                                                            {
                                                                producerName.NSXName
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column4">
                                                {this.showQRCODE(
                                                    contentProduct.QRCode
                                                )}
                                            </div>
                                            <div
                                                className="column5"
                                            >
                                                <Barcode
                                                    value={
                                                        contentProduct.BarCode
                                                    }
                                                />
                                            </div>
                                            <div className="column6">
                                                {this.hiddenContentDescription(
                                                    contentProduct.Description
                                                )}
                                            </div>
                                            <div className="column8 d-flex justify-content-end">
                                                <span>
                                                    {contentProduct.Price}
                                                </span>
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
            </div>
        );
    }
}
