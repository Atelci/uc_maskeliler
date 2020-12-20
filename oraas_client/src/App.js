import './App.css';
import Header from './components/header.js';
import UploadImage from './components/uploadImage.js';

function App() {
  return (
    <div className="App">
        <Header></Header>
        <div className="App-bg">
        </div>
        <div className="App-body">

          <div className="transbox-left">
            <ul>
              <li>
                <label htmlFor="userName" className="form-label">Your Name:</label>
                <input type="text" class="form-control" id="userName" placeholder="John"/>
              </li>

              <li>
                <label htmlFor="classSelected" className="form-label">Choose class:</label>
                <select className="selectpicker">
                  <optgroup label="Offical">
                    <option>YoloV3</option>
                  </optgroup>
                  <hr></hr>
                  <optgroup label="Custom">
                    <option>Mask</option>
                  </optgroup>
                </select>
              </li>

              <li>
                <label className="form-label" htmlFor="customFile">Default file input example:</label>
                <img src={process.env.PUBLIC_URL + '/example-image.jpg'} alt="example"></img>
              </li>

              <li>
                <label className="form-label">Your File:</label>
                {/* <input type="file" className="form-control" id="customFile" /> */}
                <UploadImage></UploadImage>
              </li>

            </ul>
          </div>

          <div className="transition">
            <a href="#">Start Processing &raquo;&raquo;</a>
          </div>

          <div className="transbox-right">
            <ul className="bulletless">
              <li>
                <label className="form-label">Default file output example:</label>
              </li>
              <li>
                <img src={process.env.PUBLIC_URL + '/example-image.jpg'} alt="example"></img>
              </li>
              <hr></hr>
              <li>
                <p>Processing your image...</p>
                <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="loading"></img>
                <button type="button" className="btn btn-primary" disabled>Download</button>
              </li>
            </ul>
          </div>

        </div>
    </div>
  );
}

export default App;
