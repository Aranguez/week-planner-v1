import React, { Component } from 'react';
import './App.css';
import WeekPlanner from './components/WeekPlanner';
// eslint-disable-next-line
import { translate, Trans } from 'react-i18next';

class App extends Component {
  render() {
    return (<WeekPlanner/>);
  }
}

export default translate('common')(App);
