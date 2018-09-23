import React, { Component } from 'react';
import './App.css';

import Timeline from './components/Timeline';
import Clock from './components/Clock';

class App extends Component {

  render() {
    
    return (
      <div className="App">
        <div>
          <Clock/>
          <Timeline/>
        </div>
      </div>
    );
  }
}

export default App;
