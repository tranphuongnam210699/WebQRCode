import React, { Component } from "react";
import axios from "axios";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const text = "Are you sure to delete?";

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    deleteCategory = (id) => {
        axios
            .delete("http://localhost:5000/category/" + id)
            .then((res) => message.success("Deleted"));

        this.setState({
            Categories: this.state.Categories.filter(
                (result) => result._id !== id
            ),
        });
    };

    render() {
        const { Categories } = this.state;
        return (
            <div className="d-flex">
                <div className="" style={{ height: "85vh", width: "40vw" }}>
                    <div className="pageCategories">
                        <div className="headerPage d-flex justify-content-between align-items-center">
                            <span className="titleHeaderPage">
                                Categories ({Categories.length})
                            </span>
                            <span className="buttonAdd d-flex align-items-center">
                                <Link to="/admin/addCategory">Add Category</Link>
                            </span>
                        </div>
                        <div className="body">
                            <div className="titleContent d-flex">
                                <div className="col-4">Category ID</div>
                                <div className="col-4">Category Name</div>
                                <div className="col-4"></div>
                            </div>
                            {Categories.map((result, index) => {
                                return (
                                    <div
                                        className="content d-flex align-items-center"
                                        key={index}
                                    >
                                        <div className="col-4">
                                            <span>{result.id}</span>
                                        </div>
                                        <div className="col-4 font-weight-bold">
                                            <Link
                                                to={{
                                                    pathname: "/admin/editCategory",
                                                    search: `?id=${result._id}`,
                                                }}
                                            >
                                                <span>
                                                    {result.CategoryName}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="col-4 d-flex justify-content-end">
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                onConfirm={() => {
                                                    this.deleteCategory(
                                                        result._id
                                                    );
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <div className="iconDelete">
                                                    <CloseOutlined />
                                                </div>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
