import React, { Component } from 'react';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import Logout from './Components/Logout'

class App extends Component {
  render() {
    return (
      <>
        <Register />
        <Login />
        <Logout />
        <Home />
      </>

    );
  }
}

export default App;
