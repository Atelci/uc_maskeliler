import React from 'react'
import '../App.css';
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
            isOutputShown: false,
            fileType: "image"
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
                this.setState({
                    fileType: postResponse.data.file_type
                })
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
            this.props.parentCallback(this.state.isOutputShown, imageURL, this.state.userId, this.state.fileType);
            this.setState({isOutputShown: false})
            isProcessed = false;
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <ul>
                    <li>
                        <label htmlFor="userId" className="form-label">Your Name:</label>
                        <input type="text" className="form-control" id="userId" name="userId" placeholder="John"
                            value={this.state.userId} onChange={this.handleUserChange}/>
                    </li>
                    <li>
                        <label htmlFor="classSelected" className="form-label">Choose class:</label>
                        <select className="selectpicker" value={this.state.className} onChange={this.handleClassChange}>
                            <optgroup label="Offical">
                              <option>coco</option>
                            </optgroup>
                            <hr></hr>
                            <optgroup label="Custom">
                              <option>mask</option>
                            </optgroup>
                        </select>
                    </li>
                    <li>
                        <label className="form-label">Your File:</label>
                        <input type="file" name="objectFile" onChange={this.handleFileChange}/>
                        <button type="submit">Upload</button>
                    </li>
                    <li>
                        <label className="form-label" htmlFor="customFile">Default file input example:</label>
                        <img src={process.env.PUBLIC_URL + '/example-image.jpg'} alt="example"></img>
                    </li>
                </ul>
            </form>
        )
    }
}

export default UploadImage
