import React from 'react'
import '../App.css';

class UserImage extends React.Component {

    

    render() {
        return(
            <img className="classesImage" src={this.props.link} alt="gallery-item"></img>
        )
    }
}

export default UserImage