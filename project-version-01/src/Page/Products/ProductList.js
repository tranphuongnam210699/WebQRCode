import React, { Component } from "react";
import './Products.scss';
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
                    <h2>Products ({product.length})</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Loại</th>
                                <th>QRCode</th>
                                <th>BarCode</th>
                                <th>Description</th>
                                <th>NSX</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((contentProduct, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{contentProduct.Image}</td>
                                        <td>{contentProduct.Name}</td>
                                        <td>{contentProduct.LoaiID}</td>
                                        <td>
                                            <QRCode
                                                value={contentProduct.QRCode}
                                                renderAs="svg"
                                                style={{
                                                    width: "142px",
                                                    height: "142px"
                                                }}
                                            />
                                        </td>
                                        <td style={{
                                                    width: "50px",
                                                    height: "50px"
                                                }}>
                                            <Barcode
                                                value={contentProduct.BarCode}
                                                
                                            />
                                        </td>
                                        <td>{contentProduct.Description}</td>
                                        <td>{contentProduct.NSXId}</td>
                                        <td>{contentProduct.Price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
