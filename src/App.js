import React, { Component } from 'react';
import './App.css';

import Nav from './components/Nav'
import Timeline from './components/Timeline';
import Clock from './components/Clock';

class App extends Component {

  render() {
    
    return (
      <div className="App"> {/* crear componente de app para almacenar datos de usuario y data */}
        <Nav/>
        <h3 style={{'marginBottom': '40px', 'marginLeft': '35px'}}>
           <span className="color-red">Hello Leandro</span><br/> hope you have a great week</h3>
        {/* crear componente de saludo */}
        <Clock/>
        <Timeline/>
      </div>
    );
  }
}

export default App;
