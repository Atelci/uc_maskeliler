import React from 'react'
import '../App.css';

class UserImage extends React.Component {

    constructor(props) {
        super(props);
        this.imageOrVideo = this.imageOrVideo.bind(this);
    }

    imageOrVideo(fileType) {
        if(fileType == "image") {
            return <img className="myImage" src={this.props.link} alt="gallery-item"></img>
        } else {
            return <video className="myVideo" controls><source src={this.props.link} type="video/mp4"/></video>
        }
    }

    render() {
        return(
            <>
                {this.imageOrVideo(this.props.fileType)}
            </>
        )
    }
}

export default UserImage