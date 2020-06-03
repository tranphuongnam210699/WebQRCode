import React, { Component } from "react";
import ExcelReader from "../../services/ReaderExcel/ExcelReader";

export default class AddProductWithExcel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ExcelReader />
            </div>
        );
    }
}
