import React from 'react'
import '../App.css';

class ClassList extends React.Component {
    render() {
        return(
            <div className="classesImage">
                <hr></hr>
                <h3>Coco classes:</h3>
                <img src={process.env.PUBLIC_URL + '/classes.png'} alt="class-list">
                </img>
                <hr></hr>
                <h3>Other:</h3>
                <ul>
                    <li>
                        <h5><b>Mask</b></h5>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ClassList;