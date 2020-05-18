import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

import "./ScanQRCode.scss";

export default class ScanQRCdoe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 150,
            result: '',
            product: [],
            categories: [],
            producer: [],
        };
        this.handleScan = this.handleScan.bind(this);
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
    handleScan(data) {
        if (data) {
            this.setState({
                result: data,
            });
        }
    }
    handleError(err) {
        console.error(err);
    }

    hiddenContentDescription = (description) => {
        if (description.length > 0) {
            const arrayDescription = description.split(";");
            return (
                <div className='contentDescription_wrapper'>
                    <div className="contentDescription">
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
                        <div className="buttonChange" onClick={() => {
                            this.setState({
                                result: ''
                            })
                        }}>Tiếp Tục Quét</div>
                    </div>
                </div>
            );
        }
    };

    onChangeResultScan = () => {
        const { result, product, categories, producer } = this.state;
        if (result == "") {
            return (
                <span className="d-flex justify-content-center font-weight-bold" style={{
                    fontSize: '4.8vw',
                    marginTop: '3vw'
                }}>
                    please Scan
                </span>
            );
        } else {
            const productScan = product.find(
                (product) => product.QRCode == result
            );
            if (productScan != null && productScan != undefined) {
                const categoryName = categories.find(
                    (result) => result.id == productScan.LoaiID
                );
                const producerName = producer.find(
                    (result) => result.id == productScan.NSXId
                );
                return (
                    <div className="productDetail">
                        <div className="infoProduct d-flex ">
                            <div className="imageProduct">
                                <img src={productScan.productImage} alt="" />
                            </div>
                            <div className="content_wrapper d-flex flex-column justify-content-between">
                                <span className="nameProduct font-weight-bold">
                                    {productScan.Name}
                                </span>
                                <div className="d-flex flex-column">
                                    <div className="content">
                                        <span>Category: </span>
                                        <span>{categoryName.CategoryName}</span>
                                    </div>
                                    <div className="content">
                                        <span>NSX: </span>
                                        <span>{producerName.NSXName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.hiddenContentDescription(
                                productScan.Description
                            )}
                        </div>
                    </div>
                );
            }
        }
    };

    render() {
        return (
            <div className="pageScanQRCode">
                <div className="navBarHeader d-flex justify-content-center">
                    ST Market
                </div>
                <div className="QRCodeScan_wrapper d-flex justify-content-center">
                    <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        className="scanQRCode"
                    />
                </div>
                <div className="result">{this.onChangeResultScan()}</div>
            </div>
        );
    }
}
