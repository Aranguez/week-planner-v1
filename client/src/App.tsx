import React from 'react';
import './App.css';
import WeekPlanner from './components/WeekPlanner';
// eslint-disable-next-line
import { withTranslation } from 'react-i18next';

const App: React.FC = () => <WeekPlanner/>

export default withTranslation('common')(App);
