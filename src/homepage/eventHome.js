import React, { Component } from 'react'
import './Appstyle.css'
import Home from './Home'
import Footer from '../components/common/Footer'
import Reg from './Reg'



class App extends Component {
  render() {
    return (
      <div className="dev">
        <Home />
        <Reg />
        <Footer />
      </div>
    );
  }
}

export default App;
