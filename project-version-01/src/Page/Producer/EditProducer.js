import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

export default class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            Name: "",
            Phone: "",
            Address: "",
        };
    }

    componentDidMount() {
        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .get(
                    "http://localhost:5000/producer/" +
                        window.location.search.match(/id=(.*)\b/)[1]
                )
                .then((response) => {
                    console.log("response", response);
                    const { id, NSXName, Phone, Address } = response.data;
                    this.setState({
                        ID: id,
                        Name: NSXName,
                        Phone: Phone,
                        Address: Address,
                    });
                });
        }
    }

    onChangeName = (e) => {
        this.setState({
            Name: e.target.value,
        });
    };

    onChangeLoaiID = (e) => {
        this.setState({
            ID: e.target.value,
        });
    };

    onChangePhone = (e) => {
        this.setState({
            Phone: e.target.value,
        });
    };

    onChangeAddress = (e) => {
        this.setState({
            Address: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const producer = {
            id: this.state.ID,
            NSXName: this.state.Name,
            Phone: this.state.Phone,
            Address: this.state.Address,
        };

        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .post(
                    "http://localhost:5000/producer/update/" +
                        window.location.search.match(/id=(.*)\b/)[1],
                    producer
                )
                .then((res) => message.success("Saved"));
        }
        message.success("Saved");

        this.setState({
            ID: "",
            Name: "",
            Phone: "",
            Address: "",
        });
    };
    render() {
        return (
            <div className="pageAddCategory">
                <h3>Edit Producer</h3>
                <form onSubmit={this.onSubmit} className="d-flex">
                    <div className="col-6">
                        <div className="form-group">
                            <label>ID: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.ID}
                                onChange={this.onChangeID}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.Name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.Phone}
                                onChange={this.onChangePhone}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.Address}
                                onChange={this.onChangeAddress}
                            />
                        </div>
                    </div>
                </form>
                <div className="form-group">
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
