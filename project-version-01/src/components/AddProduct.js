import React, { Component } from "react";
import axios from 'axios';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.onChangeBarCode = this.onChangeBarCode.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLoaiID = this.onChangeLoaiID.bind(this);
        this.onChangeNSXID = this.onChangeNSXID.bind(this);
        this.onChangeName= this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQRCode = this.onChangeQRCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: "",
            LoaiID: "",
            QRCode: "",
            BarCode: "",
            Description: "",
            NsxID: "",
            Price: ""
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

    onSubmit(e) {
        e.preventDefault();
        const {
            Name,
            LoaiID,
            QRCode,
            BarCode,
            Description,
            NsxID,
            Price
        } = this.state;
        const product = {
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
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>LoaiID: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangeLoaiID}
                        />
                    </div>
                    <div className="form-group">
                        <label>QRCode: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangeQRCode}
                        />
                    </div>
                    <div className="form-group">
                        <label>BarCode: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangeBarCode}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>NSXID: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangeNSXID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text"
                            required
                            className='form-control'
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
