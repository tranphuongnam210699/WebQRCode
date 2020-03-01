import React, { Component } from 'react'
var QRCodes = require('qrcode.react');
var Barcode = require('react-barcode');

export default class QRCode extends Component {
    render() {
        return (
            <div>
                <Barcode value="http://github.com/kciter" />
            </div>
        )
    }
}
