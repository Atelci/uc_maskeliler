import React from 'react'
const axios = require("axios");

var isProcessed = false;
var imageURL = "";
class UploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: [],
            userId: null,
            className: null,
            isOutputShown: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.getProcessedImage = this.getProcessedImage.bind(this);
    }

    // Upload image
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('objectFile',this.state.file);
        formData.append('userId',this.state.userId);
        formData.append('className',this.state.className);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://35.158.95.26:80/upload", formData, config)
            .then((postResponse) => {
                alert("The file is successfully uploaded");
                this.getProcessedImage(postResponse);
            }).catch((error) => {
        });
    }

    // Try to get image, if processed, show the image
    getProcessedImage(postResponse) {
        var myInterval = setInterval(function () {
            imageURL = "http://35.158.95.26:80/upload/" + postResponse.data.detection_id;
            axios.get(imageURL)
                .then((getResponse) => {
                    if (getResponse.data.message !== "Processing") {
                        isProcessed = true;
                        console.log(isProcessed)
                        this.setState({isOutputShown: true})
                        clearInterval(myInterval);
                    }
                })
        }.bind(this), 1000);
    }

    // Handle DOM changes
    handleFileChange(event) {
        this.setState({file:event.target.files[0]});
    }

    handleUserChange(event) {
        this.setState({userId: event.target.value});
    }

    handleClassChange(event) {
        this.setState({className: event.target.value});
    }

    componentDidUpdate() {
        if(isProcessed === true) {
            this.props.parentCallback(this.state.isOutputShown, imageURL);
            this.setState({isOutputShown: false})
            isProcessed = false;
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="objectFile" onChange={this.handleFileChange}/>
                <input id="userId" type="text" name="userId" value={this.state.userId} onChange={this.handleUserChange}/>
                <input id="className" type="text" name="className" value={this.state.className} onChange={this.handleClassChange}/>
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default UploadImage
