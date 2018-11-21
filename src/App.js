import React, { Component } from 'react';
import './App.css';

import WeekPlanner from './components/WeekPlanner';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducer from './redux/data'
import isPlainObject from './redux/isPlainObject'

export function getDefaultMiddleware() {
  return [thunk]
}

export function configureStore(options = {}) {
  const {
    middleware = getDefaultMiddleware(),
    devTools = true,
    preloadedState,
    enhancers = []
  } = options

  let rootReducer

  if (typeof reducer === 'function') {
    rootReducer = reducer
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer)
  } else {
    throw new Error(
      'Reducer argument must be a function or an object of functions that can be passed to combineReducers'
    )
  }

  const middlewareEnhancer = applyMiddleware(...middleware)

  const storeEnhancers = [middlewareEnhancer, ...enhancers]

  let finalCompose = devTools ? composeWithDevTools : compose

  const composedEnhancer = finalCompose(...storeEnhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancer)

  return store
}

//configureStore().dispatch(getUser()) //redux thunk??

class App extends Component {

  render() {
    //console.log('App renders');
    return (
      <Provider store={configureStore()}>
        <WeekPlanner/>
      </Provider>
      
    );
  }
}

export default App;
