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

    deleteCategory = (id) => {
        axios
            .delete("http://localhost:5000/producer/" + id)
            .then((res) => message.success("Deleted"));

        this.setState({
            Producers: this.state.Producers.filter(
                (result) => result._id !== id
            ),
        });
    };

    render() {
        const { Producers } = this.state;
        return (
            <div className="d-flex">
                <div className="" style={{ height: "85vh", width: "70vw" }}>
                    <div className="pageCategories">
                        <div className="headerPage d-flex justify-content-between align-items-center">
                            <span className="titleHeaderPage">
                                Producers ({Producers.length})
                            </span>
                            <span className="buttonAdd d-flex align-items-center">
                                <Link to="/addProducer">Add Producer</Link>
                            </span>
                        </div>
                        <div className="body">
                            <div className="titleContent d-flex">
                                <div className="col-2">ID</div>
                                <div className="col-4">Name</div>
                                <div className="col-2">Phone</div>
                                <div className="col-2">Address</div>
                                <div className="col-2"></div>
                            </div>
                            {Producers.map((result, index) => {
                                return (
                                    <div
                                        className="content d-flex align-items-center"
                                        key={index}
                                    >
                                        <div className="col-2">
                                            <span>{result.id}</span>
                                        </div>
                                        <div className="col-4 font-weight-bold">
                                            <Link
                                                to={{
                                                    pathname: "/editProducer",
                                                    search: `?id=${result._id}`,
                                                }}
                                            >
                                                <span>{result.NSXName}</span>
                                            </Link>
                                        </div>
                                        <div className="col-2">
                                            <span>{result.Phone}</span>
                                        </div>
                                        <div className="col-2">
                                            <span>{result.Address}</span>
                                        </div>
                                        <div className="col-2 d-flex justify-content-end">
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
