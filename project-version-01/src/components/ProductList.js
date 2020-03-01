import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
                <div className="container">
                    <h2>Products ({product.length})</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Loại</th>
                                <th>QRCode</th>
                                <th>BarCode</th>
                                <th>Image</th>
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
                                        <td>{contentProduct.QRCode}</td>
                                        <td>{contentProduct.BarCode}</td>
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
