import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { useState,useEffect,useRef,useCallback } from "react";
import axios from "axios";
import SignatureCanvas from 'react-signature-canvas';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

function App() {
  const [data, setData] = useState('No result');

  const today = new Date().toLocaleString();
  const [logins, setLogins] = useState([]);
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [image,setImage]=useState();
  const [file, setfile] = useState({});
  const [details, setDetails] = useState({
    Name: "",
    timein:today,
    timeout:""
  });

  const valueonchange = e=>{
    const locatechange = e.target.getAttribute('name');
    const value = e.target.value;
    const adddetails = {...details};
    adddetails[locatechange] = value;
    setDetails(adddetails);
  }

  useEffect(()=>{
    axios.get("http://localhost:8000/e-logbook/").then((res)=>{
      setLogins(res.data)
    })
  })

  const form = {
    Name:details.Name,
  }
  const loginperson = JSON.stringify(details);
  const submitdetails = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/e-logbook/login", form).then(()=>{
      setLogins([...logins, form])
    })
    
  }

  const handleClear = (e) =>{
    e.preventDefault();
    sign.clear();
  }

  const handleClearExisting = (e) => {
    e.preventDefault();
    document.querySelector(".pre-sign").style.display = "block";
    document.querySelector(".post-sign").style.display = "none";
    sign.clear();
  }

  const handleGenerate = (e) =>{
    e.preventDefault();
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
    document.querySelector(".pre-sign").style.display = "none";
    document.querySelector(".post-sign").style.display = "block";

  }

  const handleModify = (e) =>{
    e.preventDefault();
    document.querySelector(".pre-sign").style.display = "block";
    document.querySelector(".post-sign").style.display = "none";
  }

  const webcamRef = useRef(null);

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
    },

    [webcamRef]
  );

  const capturebtn = (e) =>{
    e.preventDefault();
    capture();
  
    document.querySelector(".pre-webcam-container").style.display = "none";
    document.querySelector(".post-webcam-container").style.display = "flex";
    if (document.querySelector(".post-webcam-container").style.display === "flex"){
    console.log("true");
    document.querySelector(".take-photo").setAttribute('disabled',true);
    }
    else{
      document.querySelector(".take-photo").setAttribute("disabled",false);

    }

  }

  const preWeb = (e) => {
    e.preventDefault();
    document.querySelector(".take-photo").disabled = false;
    document.querySelector(".pre-webcam-container").style.display = "none";

  }
  const postWeb = (e) => {
    e.preventDefault();
    document.querySelector(".take-photo").disabled = true;
    document.querySelector(".pre-webcam-container").style.display = "flex";
    document.querySelector(".post-webcam-container").style.display = "none";
  }

  const retakebtn = (e) =>{
    e.preventDefault();
    setImage();
    
    document.querySelector(".take-photo").disabled = true;
    document.querySelector(".pre-webcam-container").style.display = "flex";
    document.querySelector(".post-webcam-container").style.display = "none";
  }
  const takePhoto = (e) => {
    e.preventDefault();

    document.querySelector(".take-photo").disabled = true;

    document.querySelector(".pre-webcam-container").style.display = "flex";
   
  }

  const handlefile=(e)=>{
    setfile(e.target.files[0])
    console.log(file.name);
  }

  return (
    <div className="App-container">
      <form style={{marginTop: '5%'}}>
        <div className="header-row" >
        <h3>FORM NAME</h3>
        <hr></hr>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="row">
        <h6 className="label">Name<span style={{color: 'red', marginLeft: '3px'}}>*</span></h6>
        <input id="input" placeholder="Your answer" name="Name" onChange={valueonchange}/>
        </div>

        <div className="row">
        <h6 className="label">Phone Number<span style={{color: 'red', marginLeft: '3px'}}>*</span></h6>
        <input id="input" placeholder="Your answer" name="PhoneNumber" onChange={valueonchange}/>
        </div>

        <div className="row">
        <h6 className="label">Address<span style={{color: 'red', marginLeft: '3px'}}>*</span></h6>
        <input id="input" placeholder="Your answer" name="Address" onChange={valueonchange}/>
        </div>
        
        <div className="row">
        <h6 className="label">Identification<span style={{color: 'red', marginLeft: '5px'}}>*</span></h6>

        <div style={{padding: '0px'}}>
          <button className="take-photo" onClick={takePhoto} ><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/camera--v1.png" alt="camera--v1"/>
          <p style={{display: "inline-block", marginLeft: "10px", marginBottom:'0px'}}>Take a photo</p>
          </button>

          <input type="file" id="inputfile" style={{display: 'none'}} onChange={handlefile} />

          <label htmlFor="inputfile" style={{cursor:'pointer'}}>
            <div style={{display:'block', margin: 'auto', width: '50%'}}>
            <img width="20" height="20" src="https://img.icons8.com/metro/20/ffffff/upload.png" alt="upload"/>
            <p style={{display: "inline-block", margin: "0px 0px 0px 5px"}}>Upload</p>
            </div>
          </label>
          {/* <div>{e.target.files[0].name}</div> */}
        </div>


          <div className="post-webcam-container" style={{marginBottom: '20px'}}>
            <img src={image} />
            <div style={{display: 'flex'}}>
              <button className="clear-btn" onClick={postWeb}>Cancel</button>
              <button className="retake-btn" onClick={retakebtn}>
              Retake</button>
            </div>
          </div>

          <div className="pre-webcam-container">
              <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
            />
            <div style={{display: 'flex'}}>
            <button className="clear-btn" onClick={preWeb}>Cancel</button>
            <button className="save-btn" onClick={capturebtn}>Save</button>
            </div>
          </div>
          
        </div>

       
      </form>

      <form id="esignature">
      <div className="row">
      <h6 className="label">Signature <span style={{color: 'red', marginLeft: '5px'}}>*</span></h6>
          <div className="post-sign">
            <img src={url}></img>
            <br/>
            <br/>
            <button className="clear-btn" onClick={handleClearExisting}>Clear</button>
            <button className="edit-btn" onClick={handleModify}>Edit</button>
          </div>
         
          <div className="pre-sign" style={{padding:'7px 0px'}}>
            <div id="sig-canvas" style={{width: '100%', height: 160}}>
                <SignatureCanvas
                  canvasProps={{width:'670px', className: 'signCanvas'}}
                  ref={data=>setSign(data)}
                  id="signcanvas"
                />
            </div>
            <button className="clear-btn" onClick={handleClear}>Clear</button>
            <button className="save-btn" onClick={handleGenerate}>Save</button>
         </div>
        </div>
      </form>

    <QRCode value={JSON.stringify(form)}/>
    </div>
  );
}

export default App;
