import React, { Component } from "react";
import axios from "axios";

export default class BillDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
        };
    }

    componentDidMount() {
        if (
            window.location.search.match(/id=(.*)\b/)[1] !== "" ||
            window.location.search.match(/id=(.*)\b/)[1] != null
        ) {
            axios
                .get(
                    "http://localhost:5000/billDetail/" +
                        window.location.search.match(/id=(.*)\b/)[1]
                )
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        orderList: response.data,
                    });
                });
        }
    }

    render() {
        const { orderList } = this.state;
        return (
            <div className="pageBillDetail">
                <span className="pageBillDetail__title">
                    Bill Detail: #
                    {`${window.location.search.match(/id=(.*)\b/)[1]}`}
                </span>
                <div className="pageBillDetail__contentList">
                    <div className="pageBillDetail__contentList__title d-flex">
                        <div className="pageBillDetail__contentList__column1"></div>
                        <div className="pageBillDetail__contentList__column2">
                            BarCode
                        </div>
                        <div className="pageBillDetail__contentList__column3">
                            Quantity
                        </div>
                        <div className="pageBillDetail__contentList__column4">
                            Price
                        </div>
                        <div className="pageBillDetail__contentList__column5">
                            Total
                        </div>
                    </div>
                    <div className="pageBillDetail__contentList__content--wrapper">
                        {orderList.map((result, index) => {
                            return (
                                <div
                                    className="pageBillDetail__contentList__content d-flex"
                                    key={index}
                                >
                                    <div className="pageBillDetail__contentList__column1">
                                        {index+1}
                                    </div>
                                    <div className="pageBillDetail__contentList__column2">
                                        <span>{result.barCode}</span>
                                    </div>
                                    <div className="pageBillDetail__contentList__column3">
                                        <span>{result.quantity}</span>
                                    </div>
                                    <div className="pageBillDetail__contentList__column4">
                                        <span>{result.price} VNĐ</span>
                                    </div>
                                    <div className="pageBillDetail__contentList__column5">
                                        <span>{result.total}.000 VNĐ</span>
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
