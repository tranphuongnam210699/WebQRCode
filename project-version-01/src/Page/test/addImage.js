import React, { Component } from "react";
import axios from "axios";

import { Upload, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

export default class addImage extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            originFileObj: ''
        }
    }
    
    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    originFileObj: info.file.originFileObj
                })
            );
        }
        console.log(info);
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {originFileObj} = this.state
        const OriginFileObj =  {
            originFileObj: originFileObj
        }
        console.log('OriginFileObj :', OriginFileObj);
        fetch('http://localhost:5000/image/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                OriginFileObj
            })
        })
        .then(res => res.json())
        .then(json => console.log(json))
        // axios
        //     .post("http://localhost:5000/image/add", OriginFileObj)
        //     .then(res => console.log(res.data));
    }

    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { imageUrl } = this.state;

        return (
            <div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: "100%" }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
                <Button onClick={this.onSubmit}>Upload</Button>
            </div>
        );
    }
}
