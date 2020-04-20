import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

export default class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            Name: "",
        };
    }

    componentDidMount() {
        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .get(
                    "http://localhost:5000/category/" +
                        window.location.search.match(/id=(.*)\b/)[1]
                )
                .then((response) => {
                    console.log('response', response)
                    const {
                        id,
                        CategoryName
                    } = response.data;
                    this.setState({
                        ID: id,
                        Name: CategoryName
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
    onSubmit = (e) => {
        e.preventDefault();

        const category = {
            CategoryName: this.state.Name,
            id: this.state.ID,
        };
        console.log("category", category);

        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .post(
                    "http://localhost:5000/category/update/" +
                        window.location.search.match(/id=(.*)\b/)[1],
                    category
                )
                .then((res) => message.success("Saved"));
        }
        message.success("Saved");

        this.setState({
            Name: "",
            ID: "",
        });
    };
    render() {
        return (
            <div className="pageAddCategory">
                <h3>Edit Category</h3>
                <form onSubmit={this.onSubmit} className="d-flex">
                    <div className="col-6">
                        <div className="form-group">
                            <label>ID: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.ID}
                                onChange={this.onChangeLoaiID}
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
