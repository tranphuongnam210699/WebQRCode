import React, { Component } from "react";

export default class HeaderPage extends Component {
    render() {
        return (
            <div className="headerPage d-flex align-items-center">
                <span className="titlePage font-weight-bold">Order</span>
                <span className="idCustomer">Id: Cus123456</span>
                <span className="nameCus">Name: Trần Văn A</span>
            </div>
        );
    }
}
