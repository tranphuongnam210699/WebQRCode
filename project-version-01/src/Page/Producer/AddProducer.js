import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            Name: "",
            Phone: "",
            Address: "",
            Producers: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/producer")
            .then((response) => {
                this.setState({ Producers: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeName = (e) => {
        this.setState({
            Name: e.target.value,
        });
    };

    onChangeID = (e) => {
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
            producer.ID != "" &&
            producer.Name != "" &&
            producer.Phone != "" &&
            producer.Address != ""
        ) {
            const arrCheck = this.state.Producers.map((result, index) => {
                if (result.id == this.state.ID) {
                    return 1;
                } else return 0;
            });
            const isCheck = arrCheck.includes(1);
            if (isCheck == true) {
                message.error("Data Exists!! Please check again");
            } else {
                axios
                    .post("http://localhost:5000/producer/add", producer)
                    .then((res) => message.success("Saved"));
                this.setState({
                    ID: "",
                    Name: "",
                    Phone: "",
                    Address: "",
                });
            }
        } else {
            message.error("Missing Data! Please check again");
        }
    };
    render() {
        return (
            <div className="pageAddCategory">
                <h3>Add Producer</h3>
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
