import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            Name: "",
            Categories: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/category")
            .then((response) => {
                this.setState({ Categories: response.data });
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

        if (category.id != "" && category.CategoryName != "") {
            const arrCheck = this.state.Categories.map((result, index) => {
                if (result.id == this.state.ID) {
                    return 1;
                } else return 0;
            });
            const isCheck = arrCheck.includes(1);
            if (isCheck == true) {
                message.error("Data Exists!! Please check again");
            } else {
                axios
                    .post("http://localhost:5000/category/add", category)
                    .then((res) => message.success("Saved"));
                this.setState({
                    Name: "",
                    ID: "",
                });
            }
        } else {
            message.error("Missing Data! Please check again");
        }
    };
    render() {
        return (
            <div className="pageAddCategory">
                <h3>Add Category</h3>
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
