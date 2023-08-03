import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState('No result');

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
  })

  const form = {
    firstname:details.firstname,
    lastname:details.lastname,
    timein:details.timein,
    timeout:details.timeout
  }
  const loginperson = JSON.stringify(details);
  const submitdetails = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/e-logbook/login", form).then(()=>{
      setLogins([...logins, form])
    })
    
  }

  return (
    <div className="App container p-5">
     
              {logins.map((data, index)=>{
            if(loginperson === data){
                return(  
                 
                        <div key={index} className="row">    
                    <div  className="col">
                      {data.lastname}
                    </div>
                    <div className="col">
                      {data.firstname}
                    </div>
                  </div>
                 
              
                ) 
              
              //if
            }else{
              return(
                <div>{loginperson}</div>
              )
            }

              })}
      

     <form onSubmit={submitdetails} className="form m-5">
        <input placeholder="firstname" name="firstname" onChange={valueonchange}/>
        <input placeholder="lastname" name="lastname" onChange={valueonchange}/>
        <button>submit</button>
    </form>
      <QRCode value={loginperson}/>

    {/*    <QrReader className="qrreader"
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          // if (!!error) {
          //   console.info(error);
          // }
        }}
      />
      <p>{data}</p> */}
      {
        
        logins.map((data)=>{
            return(
              <>
              {JSON.stringify(data)}
                </>
            )
        })
      }
     
    </div>
  );
}

export default App;
