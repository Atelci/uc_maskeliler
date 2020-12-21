import './App.css';
import React from 'react'
import Header from './components/header.js';
import UploadImage from './components/uploadImage.js';
import ClassList from "./components/classlist.js";
import Gallery from "./components/gallery.js";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        output: process.env.PUBLIC_URL + '/example-output-image.jpg',
        user: "",
    };
    this.onOutputChange = this.onOutputChange.bind(this);
    this.handleFileType = this.handleFileType.bind(this);
  }

  // Change output image if its processed, triggered y child component UploadImage
  onOutputChange = (isOutputShown, imageURL, userId, fileType) => {
    if(isOutputShown === true) {
      this.setState({
        output: imageURL,
        user: userId
      })
      this.handleFileType(fileType)
    }
  }

  // handle image or video
  handleFileType(fileType = null) {
    // file type check
    if(fileType == "image") {
      return <img src={this.state.output} alt="example-output"></img>
    } else if(fileType == "video") {
      return <video controls><source src={this.state.output} type="video/mp4">Your browser does not support the video tag.</source></video>
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>
            <div className="App-bg"></div>
            <div className="App-body">
              <Switch>

                {/*  Home Page */}
                <Route exact path="/">
                  <div className="transbox-left">
                    <UploadImage parentCallback={this.onOutputChange}></UploadImage>
                  </div>
                  <div className="transbox-right">
                    <ul className="bulletless">
                      <li>
                        <label className="form-label">Default file output example:</label>
                      </li>
                      <li>
                        {this.handleFileType()}
                        {/* <img src={this.state.output} alt="example-output"></img> */}
                      </li>
                      <hr></hr>
                      <li>
                        <p>Processing your image...</p>
                        <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="loading"></img>
                        <button type="button" className="btn btn-primary" disabled>Download</button>
                      </li>
                    </ul>
                  </div>
                </Route>

                {/* Class List */}
                <Route path="/classes">
                  <ClassList></ClassList>
                </Route>

                {/* User Images */}
                <Route path="/myimages">
                  <Gallery></Gallery>
                </Route>
              </Switch>
            </div>
        </Router>
      </div>
    );
  }

}

export default App;
