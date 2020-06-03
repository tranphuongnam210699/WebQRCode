import React, { Component } from "react";
import "./Bill.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const text = "Are you sure to delete?";

class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/bill")
            .then((response) => {
                this.setState({ bill: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteBill = (id) => {
        axios
            .delete("http://localhost:5000/bill/" + id)
            .then((res) => message.success("Deleted"));

        this.setState({
            bill: this.state.bill.filter((result) => result._id !== id),
        });
    };

    render() {
        const { bill } = this.state;
        console.log(bill);
        return (
            <div className="pageBill">
                <span className="pageBill__title">
                    Bill {`(${bill.length})`}
                </span>
                <div className="pageBill__listBill d-flex flex-column">
                    <div className="pageBill__listBill__title d-flex">
                        <div className="pageBill__listBill__column1">
                            ID Bill
                        </div>
                        <div className="pageBill__listBill__column2">
                            Cus Name
                        </div>
                        <div className="pageBill__listBill__column3">
                            Quantity
                        </div>
                        <div className="pageBill__listBill__column4">Total</div>
                        <div className="pageBill__listBill__column5">
                            Date Up
                        </div>
                        <div className="pageBill__listBill__column6"></div>
                    </div>
                    <div className="pageBill__listBill__content-wrapper">
                        {bill.map((result, index) => {
                            return (
                                <div
                                    className="pageBill__listBill__content d-flex"
                                    key={index}
                                >
                                    <div className="pageBill__listBill__column1">
                                        <Link
                                            to={{
                                                pathname: "/admin/billDetail/",
                                                search: `?id=${result._id}`,
                                            }}
                                        >
                                            <span className="font-weight-bold">
                                                {result._id}
                                            </span>
                                        </Link>
                                        {}
                                    </div>
                                    <div className="pageBill__listBill__column2">
                                        {result.idCus}
                                    </div>
                                    <div className="pageBill__listBill__column3">
                                        {result.quantity}
                                    </div>
                                    <div className="pageBill__listBill__column4">
                                        {result.total}.000
                                    </div>
                                    <div className="pageBill__listBill__column5">
                                        {result.date}
                                    </div>
                                    <div className="pageBill__listBill__column6 d-flex justify-content-end">
                                        <Popconfirm
                                            placement="top"
                                            title={text}
                                            onConfirm={() => {
                                                this.deleteBill(
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
        );
    }
}

export default Bill;
