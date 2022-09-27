import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login';
import { PrivateRoutes } from './components/PrivateRoutes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoutes><Home/></PrivateRoutes>}/>
            <Route exact path="/login" element={<Login/>}/>
          </Routes> 
     </Router>
    </div>
  );
}

export default App;
