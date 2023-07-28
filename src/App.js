import QRCode from "react-qr-code";
import { useState,useEffect } from "react";
import axios from "axios";

function App() {

  const today = new Date().toLocaleString();
  const [logins, setLogins] = useState([]);
  const [details, setDetails] = useState({
    firstname: "",
    lastname:"",
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
  },[])

  const form = {
    firstname:details.firstname,
    lastname:details.lastname
  }
  return (
    <div className="App container">
      <form className="form m-5">
        <input placeholder="firstname" name="firstname" onChange={valueonchange}/>
        <input placeholder="lastname" name="lastname" onChange={valueonchange}/>
      </form>

      <QRCode value={JSON.stringify(form)}/>
    </div>
  );
}

export default App;
