import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./type";
import "./ExcelReader.scss";
import axios from "axios";
import { message } from "antd";
import history from "../../history";

class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
    }

    handleFile() {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
                type: rABS ? "binary" : "array",
                bookVBA: true,
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            this.setState(
                { data: data, cols: make_cols(ws["!ref"]) },
                () => {}
            );
        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        }
    }

    onSubmit = () => {
        const { data } = this.state;
        if (data.length > 0 && data != null && data != undefined) {
            data.map((result, index) => {
                const { BarCode, Name, QrCode, Price, Description } = result;
                const newProduct = {
                    Name: Name,
                    QRCode: QrCode,
                    BarCode: BarCode,
                    Description: Description,
                    Price: Price,
                };
                axios
                    .post("http://localhost:5000/products/add", newProduct)
                    .then((res) => {
                        message.success("Saved");
                        history.push("/admin/products");
                        window.location.reload();
                    });
            });
        }
    };

    showResultImport = (data) => {
        if (data != null && data != undefined) {
            return (
                <div>
                    <div className="resultList">
                        <div className="resultList__title d-flex">
                            <div className="resultList__column1"></div>
                            <div className="resultList__column2">Name</div>
                            <div className="resultList__column3">BarCode</div>
                            <div className="resultList__column4">QrCode</div>
                            <div className="resultList__column5">Price</div>
                            <div className="resultList__column6">
                                Description
                            </div>
                        </div>
                        <div className="resultList__content__wrapper">
                            {data.map((result, index) => {
                                return (
                                    <div
                                        className="resultList__content d-flex"
                                        key={index}
                                    >
                                        <div className="resultList__column1">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="resultList__column2">
                                            <span>{result.Name}</span>
                                        </div>
                                        <div className="resultList__column3">
                                            <span>{result.BarCode}</span>
                                        </div>
                                        <div className="resultList__column4">
                                            <span>{result.QrCode}</span>
                                        </div>
                                        <div className="resultList__column5">
                                            <span>{result.Price}</span>
                                        </div>
                                        <div className="resultList__column6">
                                            <span>{result.Description}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className="resultList__button__Wrapper d-flex justify-content-end"
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >
                        <span className="resultList__button">Submit</span>
                    </div>
                </div>
            );
        }
    };

    render() {
        const { data } = this.state;
        return (
            <div className="pageExcelReaderFile">
                <div>
                    <label className="titleHeaderPage">Upload File Excel</label>
                    <br />
                    <input
                        type="file"
                        className="inputFileExcel"
                        id="file"
                        accept={SheetJSFT}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        className="buttonSubmit"
                        type="submit"
                        value="Confirm"
                        onClick={this.handleFile}
                    />
                </div>
                {this.showResultImport(data)}
            </div>
        );
    }
}

export default ExcelReader;
