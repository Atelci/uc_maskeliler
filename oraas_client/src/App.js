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

let finished = 1; // 1 initial, 2 finished, 3 waiting another
let CurrentFileType = "image";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        output: process.env.PUBLIC_URL + '/example-output-image.jpg',
        user: "",
        processing: false
    };
    this.onOutputChange = this.onOutputChange.bind(this);
    this.handleFileType = this.handleFileType.bind(this);
    this.showProcessingInfo = this.showProcessingInfo.bind(this);
  }

  // Change output image if its processed, triggered y child component UploadImage
  onOutputChange = (isOutputShown, imageURL, userId, fileType, processing) => {
    // Show processing prompt while processing
    if(processing && this.state.processing == false) {
      this.setState({processing: true});
      this.render();
    }

    if(isOutputShown === true) {
      this.setState({
        output: imageURL,
        user: userId,
        processing: false
      })
      finished = 2; // finsihed

      this.handleFileType(fileType)
      this.render();
    }
  }

  // handle image or video
  handleFileType(fileType = null) {
    // file type check
    if(fileType == "image") {
      CurrentFileType = "image"
      return <img src={this.state.output} alt="example-output"></img>
    } else if(fileType == "video") {
      CurrentFileType = "video"
      return <video controls><source src={this.state.output} type="video/mp4"/></video>
    } else {
      // example output image
      return <img src={this.state.output} alt="example-output-default"></img>
    }
  }

  // Show process status(waiting, loading, finished)
  showProcessingInfo() {
    if(finished === 2) {
      finished = 3; // waiting new one
      return <p><b>Done!!</b></p>
    }

    if(this.state.processing == true) {
      // processing...
      return <div><p>Processing your image...</p><img src={process.env.PUBLIC_URL + '/loading.gif'} alt="loading"></img></div>
    } else if(finished === 1) {
      // initial phase
      return <p>Waiting your input file</p>
    } else if (finished === 3){
      // Waiting another input
      return <p><b>Done!!</b></p>
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
                        {this.handleFileType(CurrentFileType)}
                      </li>
                      <hr></hr>
                      <li>
                        {this.showProcessingInfo()}
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
