import React, { Component } from "react";
import axios from "axios";
import "./Categories.scss";
import { Link } from "react-router-dom";

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Categories: []
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/category")
            .then(response => {
                this.setState({ Categories: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { Categories } = this.state;
        return (
            <div className='d-flex'>
                <div className="col-6" style={{borderRight:'1px solid black', height:'85vh'}}>
                    <div className="pageCategories">
                        <div className="headerPage d-flex justify-content-between align-items-center">
                            <span className="titleHeaderPage">
                                Categories ({Categories.length})
                            </span>
                            <span className="buttonAdd">
                                <Link to="/addCategory">Add Category</Link>
                            </span>
                        </div>
                        <div className="body">
                            <div className="titleContent d-flex">
                                <div className="col-5">Category ID</div>
                                <div className="col-7">Category Name</div>
                            </div>
                            {Categories.map((result, index) => {
                                return (
                                    <div className="content d-flex" key={index}>
                                        <div className="col-5">
                                            <span>{result.id}</span>
                                        </div>
                                        <div className="col-7">
                                            <span>
                                                {result.CategoryName}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-6" style={{height:'85vh'}}>
                    <div className="pageCategories">
                        <div className="headerPage d-flex justify-content-between align-items-center">
                            <span className="titleHeaderPage">
                                Categories ({Categories.length})
                            </span>
                            <span className="buttonAdd">
                                <Link to="/addCategory">Add Category</Link>
                            </span>
                        </div>
                        <div className="body">
                            <div className="titleContent d-flex">
                                <div className="col-5">Category ID</div>
                                <div className="col-7">Category Name</div>
                            </div>
                            {Categories.map((result, index) => {
                                return (
                                    <div className="content d-flex" key={index}>
                                        <div className="col-5">
                                            <span>{result.id}</span>
                                        </div>
                                        <div className="col-7">
                                            <span>
                                                {result.CategoryName}
                                            </span>
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
