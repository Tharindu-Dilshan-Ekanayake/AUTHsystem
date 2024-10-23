//import logo from './logo.svg';
import './App.css';
import Login from './pages/loginpages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/loginpages/Register';

import axios from 'axios'
import Admindash from './pages/adminpages/Admindash';
import Userdash from './pages/userpages/Userdash';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path='/admindash' element={<Admindash/>}/> 

          <Route path="/userdash" element={<Userdash/>}/>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
