import React, { Component } from "react";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { removePunctuation } from "../../services/CommonFunction";

export default class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderProductSearch: [],
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (
            props.productList.toString() !=
                state.renderProductSearch.toString() &&
            state.renderProductSearch.toString() == ""
        ) {
            console.log("state", state);
            return { renderProductSearch: props.productList };
        } else return null;
    }

    searchFilter = (e) => {
        let searchInput = removePunctuation(e.target.value.toLowerCase()) || "";
        let renderSearch = [];
        const { productList } = this.props;
        console.log("renderSearch1", renderSearch);
        renderSearch = productList.filter((product) => {
            let name = product.Name.toLowerCase();
            name = removePunctuation(name);
            return name.search(searchInput) !== -1;
        });
        console.log("renderSearch2", renderSearch);
        if (renderSearch.length === 0) {
            renderSearch = productList.filter((product) => {
                let barCode = product.BarCode.toLowerCase();
                return barCode.search(searchInput) !== -1;
            });
        }

        this.setState({
            renderProductSearch: renderSearch,
        });
    };

    onAddProduct = (productName, barCode, price) => {
        const { addToListOrder } = this.props;
        addToListOrder(productName, barCode, 1, price);
    };

    render() {
        const { renderProductSearch } = this.state;
        return (
            <div className="searchProduct_wrapper">
                <div className="top_SearchProduct d-flex align-items-center justify-content-between">
                    <div className="input">
                        <Input
                            placeholder="Search Product"
                            onChange={this.searchFilter}
                        />
                    </div>
                    <div className="buttonSearch d-flex align-items-center justify-content-center">
                        <ReloadOutlined />
                    </div>
                </div>
                <div className="productList_searchProduct">
                    <div className="titleHeaderTable d-flex">
                        <div className="column1">Image</div>
                        <div className="column2">Name</div>
                        <div className="column3">BarCode</div>
                        <div className="column4"></div>
                    </div>
                    <div className="contentTable_wrapper">
                        {renderProductSearch.map((product, index) => {
                            return (
                                <div
                                    className="contentTable d-flex align-items-center"
                                    key={index}
                                >
                                    <div className="column1">
                                        <div className="image">
                                            <img
                                                src={product.productImage}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="column2">
                                        <span className="font-weight-bold">
                                            {product.Name}
                                        </span>
                                    </div>
                                    <div className="column3">
                                        <span>{product.BarCode}</span>
                                    </div>
                                    <div className="column4">
                                        <div className="buttonAdd_ProductSearch">
                                            <PlusOutlined
                                                onClick={() =>
                                                    this.onAddProduct(
                                                        product.Name,
                                                        product.BarCode,
                                                        product.Price
                                                    )
                                                }
                                            />
                                        </div>
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
