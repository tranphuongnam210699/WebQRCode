import React, { Component } from "react";
import axios from "axios";

import { Upload, message, Select } from "antd";

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

export default class EditProduct extends Component {
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
            producer:[]
        };
    }

    componentDidMount() {
        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .get(
                    "http://localhost:5000/products/" +
                        window.location.search.match(/id=(.*)\b/)[1]
                )
                .then((response) => {
                    const {
                        productImage,
                        Name,
                        LoaiID,
                        QRCode,
                        BarCode,
                        Description,
                        NSXId,
                        Price,
                    } = response.data;
                    this.setState({
                        Image: productImage,
                        Name: Name,
                        LoaiID: LoaiID,
                        QRCode: QRCode,
                        BarCode: BarCode,
                        Description: Description,
                        NsxID: NSXId,
                        Price: Price,
                    });
                });
        }

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

    onChangeNSXID(e) {
        this.setState({
            NsxID: e.target.value,
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
        } = this.state;
        const product = {
            Image: Image,
            Name: Name,
            LoaiID: LoaiID,
            QRCode: QRCode,
            BarCode: BarCode,
            Description: Description,
            NSXId: NsxID,
            Price: Price,
        };

        console.log(product);

        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios(
                "http://localhost:5000/products/update/" +
                    window.location.search.match(/id=(.*)\b/)[1],
                {
                    method: "post",
                    headers: new Headers({
                        "Content-Type": "multipart/form-data",
                    }),
                    data: product,
                }
            );
        }
        message.success('Saved');
    }

    render() {
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
            NsxID,
            Price,
        } = this.state;
        return (
            <div className="pageAddProduct">
                <h3>Edit Product</h3>
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
                                value={LoaiID}
                                style={{ width: "20vw" }}
                                onChange={this.onChangeLoaiID}
                            >
                                {categories.map((result, index) => {
                                    console.log('result', result)
                                    return (
                                        <Option
                                            value={result.id}
                                            key={index}
                                        >
                                            {result.CategoryName}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <label>NSXID: </label>
                            <Select
                                value={NsxID}
                                style={{ width: "20vw" }}
                                onChange={this.onChangeNSXID}
                            >
                                {producer.map((result, index) => {
                                    return (
                                        <Option value={result.id} key={result}>
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
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                <img src={Image} alt=""/>
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
