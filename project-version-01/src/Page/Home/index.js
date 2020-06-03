import React, { Component } from "react";
import "./Home.scss";
import { Input, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../../history";

import backgroundHome from "../../asset/backgroundPageLogin.jpg";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            account: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/users")
            .then((response) => {
                this.setState({ account: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    onChangePassWord = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    onSubmit = (username, password) => {
        const { account } = this.state;
        if ((username, password != null && username, password != undefined)) {
            const usernameConfirm = account.find(
                (result) => result.username == username
            );
            if (usernameConfirm != undefined && usernameConfirm !== null) {
                if (password == usernameConfirm.password) {
                    localStorage.setItem(
                        "displayName",
                        usernameConfirm.displayName
                    );
                    localStorage.setItem(
                        "accountType",
                        usernameConfirm.accountType
                    );
                    history.push("/admin");
                    window.location.reload();
                } else message.error("Password incorrect!!!!");
            } else message.error("Username or password incorrect!!!!");
        }
    };

    handleKeyDown = (e) => {
        const { username, password } = this.state;
        if ((username, password != null || username, password != undefined)) {
            if (e.key == "Enter") {
                this.onSubmit(username, password);
            }
        }else message.error("Username or password not null")
    };

    render() {
        const { username, password } = this.state;
        return (
            <div className="homePage_wrapper d-flex justify-content-center align-items-center">
                <div className="image_wrapper">
                    <img src={backgroundHome} alt="" />
                </div>
                <div className="formLogin_wrapper">
                    <div className="titleFormLogin">
                        <span className="font-weight-bold">
                            Chào Mừng Bạn Đến Với Hệ Thống <br /> Quản lý Cửa
                            Hàng ST Market
                        </span>
                    </div>
                    <div className="formLogin">
                        <div className="inputUserName">
                            <span className="titleFormInput">UserName</span>
                            <div className="input_wrapper d-flex align-items-center">
                                <UserOutlined />
                                <Input
                                    placeholder="UserName"
                                    onChange={this.onChangeUserName}
                                />
                            </div>
                        </div>
                        <div className="inputPassWord">
                            <span className="titleFormInput">Password</span>
                            <div className="input_wrapper d-flex align-items-center">
                                <LockOutlined />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    onChange={this.onChangePassWord}
                                    onKeyDown={this.handleKeyDown}
                                />
                            </div>
                        </div>
                        <div
                            className="buttonAccept_wrapper"
                            onClick={() => {
                                this.onSubmit(username, password);
                            }}
                        >
                            <span className="buttonAccept">Login</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
