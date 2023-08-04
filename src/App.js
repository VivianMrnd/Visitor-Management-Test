import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Main from './Main';
import Qrpage from './Qrpage';

function App(){
  return (
    <div className="container-fluid m-0 p-0 App ">
     
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route index element= {<Main/>}/>
          <Route path='/qr' element= {<Qrpage/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;