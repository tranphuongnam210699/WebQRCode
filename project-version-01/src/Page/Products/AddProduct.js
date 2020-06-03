import React, { Component } from "react";
import axios from "axios";

import { Upload, message, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import qrcode from "qrcode.react";

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

const { Option } = Select;

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
            loading: false,
            imageUrl: "",
            categories: [],
            producer: [],
            product: [],
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
        axios.get("http://localhost:5000/category").then((response) => {
            if (response.data.length > 0) {
                response.data.map((result) => {
                    this.setState({
                        categories: response.data,
                    });
                });
            }
        });
        axios.get("http://localhost:5000/producer").then((response) => {
            if (response.data.length > 0) {
                response.data.map((result) => {
                    this.setState({
                        producer: response.data,
                    });
                });
            }
        });
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value,
        });
    }

    onChangeLoaiID(value) {
        this.setState({
            LoaiID: value,
        });
    }

    onChangeQRCode(e) {
        this.setState({
            QRCode: e.target.value,
        });
    }

    onChangeBarCode(e) {
        this.setState({
            BarCode: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            Description: e.target.value,
        });
    }

    onChangeNSXID(value) {
        this.setState({
            NsxID: value,
        });
    }

    onChangePrice(e) {
        this.setState({
            Price: e.target.value,
        });
    }
    handleChange = (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, (imageUrl) =>
                this.setState({
                    imageUrl,
                    loading: false,
                    Image: imageUrl,
                })
            );
        }
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
            Price,
            product,
        } = this.state;
        const productInput = {
            Image: Image,
            Name: Name,
            LoaiID: LoaiID,
            QRCode: QRCode,
            BarCode: BarCode,
            Description: Description,
            NSXId: NsxID,
            Price: Price,
        };

        if (
            Image != "" &&
            Name != "" &&
            LoaiID != "" &&
            QRCode != "" &&
            BarCode != "" &&
            Description != "" &&
            NsxID != "" &&
            Price != ""
        ) {
            const arrProductCheck = product.map((result, index) => {
                if (result.BarCode == BarCode) {
                    return 1;
                } else return 0;
            });
            const isCheck = arrProductCheck.includes(1);
            if (isCheck == true) {
                message.error("Data Exists!! Please check again");
            } else {
                axios("http://localhost:5000/products/add", {
                    method: "post",
                    headers: new Headers({
                        "Content-Type": "multipart/form-data",
                    }),
                    data: productInput,
                });
                message.success("Saved");
                this.setState({
                    Image: "",
                    Name: "",
                    LoaiID: "",
                    QRCode: "",
                    BarCode: "",
                    Description: "",
                    NsxID: "",
                    Price: "",
                });
            }
        } else {
            message.error("Missing Data! Please check again");
        }
    }

    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {
            imageUrl,
            categories,
            producer,
            Image,
            Name,
            LoaiID,
            QRCode,
            BarCode,
            Description,
            Price,
            NsxID,
        } = this.state;
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
                                value={Name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <label>Category: </label>
                            <Select
                                placeholder="Selection Category"
                                style={{ width: "20vw" }}
                                onChange={this.onChangeLoaiID}
                            >
                                {categories.map((result, index) => {
                                    return (
                                        <Option value={result.id} key={index}>
                                            {result.CategoryName}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <label>Producer: </label>
                            <Select
                                placeholder="Selection Producer"
                                style={{ width: "20vw" }}
                                onChange={this.onChangeNSXID}
                            >
                                {producer.map((result, index) => {
                                    return (
                                        <Option value={result.id} key={index}>
                                            {result.NSXName}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>Price: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={Price}
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
                                value={QRCode}
                                onChange={this.onChangeQRCode}
                            />
                        </div>
                        <div className="form-group">
                            <label>BarCode: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={BarCode}
                                onChange={this.onChangeBarCode}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={Description}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                            value={Image}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </div>
                </form>
                <div className="form-group d-flex justify-content-end">
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                        onClick={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}
