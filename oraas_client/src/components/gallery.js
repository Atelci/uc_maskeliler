import React from 'react'
import '../App.css';
import UserImage from "./userimage.js"

const axios = require("axios");

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            imgLinkArray: []
        };
        this.getImages = this.getImages.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    // Get users images
    getImages() {
        var tempArray = [];
        axios.get("http://35.158.95.26:80/user/" + this.state.user)
        .then((response) => {
          var arrayResponse = Object.entries(response.data);

          console.log("arrayResponse",arrayResponse)
          arrayResponse.forEach(element => {
            if(element[1].status == 'Completed') {
                tempArray.push(<UserImage fileType={element[1].fileType} link={"http://35.158.95.26:80" + element[1].fileName}></UserImage>)
            }
          });
        })
        .then(() => {
            this.setState({imgLinkArray: tempArray})
            this.render();
        });
    }

    handleUserChange(event) {
        this.setState({user: event.target.value});
    }

    render() {
        return(
            <>
                <div className="transbox-left">
                    <label htmlFor="user" className="form-label">Your Name:</label>
                    <input type="text" className="form-control" id="user" name="user" placeholder="John"
                            value={this.state.user} onChange={this.handleUserChange}/>
                    <label className="form-label">Click to retrieve your images</label>
                    <button type="submit" onClick={this.getImages}>Get Images!</button>
                </div>
                <div className="transbox-right">
                    {this.state.imgLinkArray}
                </div>
            </>
        )
    }
}

export default Gallery