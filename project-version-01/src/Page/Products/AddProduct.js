import React, { Component } from "react";
import axios from "axios";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.onChangeBarCode = this.onChangeBarCode.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLoaiID = this.onChangeLoaiID.bind(this);
        this.onChangeNSXID = this.onChangeNSXID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQRCode = this.onChangeQRCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Image: "",
            Name: "",
            LoaiID: "",
            QRCode: "",
            BarCode: "",
            Description: "",
            NsxID: "",
            Price: "",
            loading: false
        };
    }

    componentDidMount() {}

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeLoaiID(e) {
        this.setState({
            LoaiID: e.target.value
        });
    }

    onChangeQRCode(e) {
        this.setState({
            QRCode: e.target.value
        });
    }

    onChangeBarCode(e) {
        this.setState({
            BarCode: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            Description: e.target.value
        });
    }

    onChangeNSXID(e) {
        this.setState({
            NsxID: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            Price: e.target.value
        });
    }

    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    Image: info.file.originFileObj
                })
            );
        }
        console.log(info);
    };

    onSubmit(e) {
        e.preventDefault();
        const {
            Image,
            Name,
            LoaiID,
            QRCode,
            BarCode,
            Description,
            NsxID,
            Price
        } = this.state;
        const product = {
            Image: Image,
            Name: Name,
            LoaiID: LoaiID,
            QRCode: QRCode,
            BarCode: BarCode,
            Description: Description,
            NSXId: NsxID,
            Price: Price
        };

        console.log(product);

        axios
            .post("http://localhost:5000/products/add", product)
            .then(res => console.log(res.data));
        // window.location = "/products";
    }

    render() {
        return (
            <div className="pageAddProduct">
                <h3>Add Product</h3>
                <form onSubmit={this.onSubmit} className="d-flex">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label>LoaiID: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangeLoaiID}
                            />
                        </div>
                        <div className="form-group">
                            <label>NSXID: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangeNSXID}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangePrice}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>QRCode: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangeQRCode}
                            />
                        </div>
                        <div className="form-group">
                            <label>BarCode: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangeBarCode}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.onChangeDescription}
                            />
                        </div>
                    </div>
                </form>
                <div className="form-group d-flex justify-content-end">
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                    />
                </div>
            </div>
        );
    }
}
