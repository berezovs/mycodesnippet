import React, { Component } from 'react';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import { Routes, Route, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>


      </>

    );
  }
}

export default App;
