import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { useState,useEffect,useRef,useCallback } from "react";
import axios from "axios";

function Qrpage(){
    const today = new Date().toLocaleString();
    const [logins, setLogins] = useState([]);

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
    return(
        <div className="App-container">
            <div className="header-row" style={{marginTop: '5%', marginBottom: '3%'}} >
                <h3>Your QR Code:</h3>
                <p>Please save your qr code as part of the login and easy access of the property.</p>
                <hr></hr>
                <QRCode style={{margin: 'auto', padding:'30px 0px 30px'}} value={JSON.stringify(form)}/>
            </div>
            <p style={{float: 'right', fontSize:'18px'}}><a href="/" style={{marginRight:'30px'}} >Edit Form</a></p>
        </div>
    );

}

export default Qrpage;