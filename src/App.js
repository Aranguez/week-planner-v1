import React, { Component } from 'react';
import './App.css';

import Day from './components/Day';
import Clock from './components/Clock';
// eslint-disable-next-line
import config, { firestore } from './firebase/config'

class App extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData = () => {
    firestore.collection('tasks')
      .get()
      .then(res => {
        const data = res.docs.map( task => task.data() )
        this.setState({
          data,
          loading: false
        })
        
      })
  }

  render() {
    return (
      <div className="App">
        <div className={`loading ${ !this.state.loading ? 'hide' : ''} `}>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
        <div className={this.state.loading ? 'blurred' : ''}>
          <Clock/>
          <Day data={this.state.data} getData={this.getData}/>
        </div>
        
      </div>
    );
  }
}

export default App;
