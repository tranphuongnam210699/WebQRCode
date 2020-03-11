import React, { Component } from "react";
import QrReader from "react-qr-reader";

import './ScanQRCode.scss';

export default class ScanQRCdoe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result"
        };
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(data) {
        if (data) {
            this.setState({
                result: data
            });
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (
            <div className='QRCodeScan_wraper'>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    className="d-flex flex-row justify-content-center align-items-center"
                />
                <div className='result'>
                    <span>{this.state.result}</span>
                </div>
            </div>
        );
    }
}
