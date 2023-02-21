//import React from 'react';
import taskReducer from './taskReducer';

const initialState = {
  tasksList: []
}

describe('Task Reducer', () => {
  it('Should get all tasks', () => {
    const action = {
      type: 'GET_TASKS',
      payload: [{}, {}, {}]
    }

    const newState = taskReducer(initialState, action)
    expect(newState).toEqual({tasksList: action.payload});
  })

  it('Should add a task', () => {
    const action = {
      type: 'ADD_TASK',
      payload: { name: 'New Task' }
    }

    const newState = taskReducer(initialState, action)
    expect(newState).toEqual({tasksList: [action.payload]});
  })

  // it('Should not add a task', () => {})

  it('Should check a task as done', () => {
    const state = {
      tasksList: [{
        id:'1',
        name:'Task',
        done: false
      }]
    };

    const action = {
      type: 'CHECK_TASK',
      payload: { id:'1', name: 'Task', done: false }
    }

    const newState = taskReducer(state, action)
    expect(newState).toEqual({tasksList: [{ id:'1', name: 'Task', done: true }]});
    //expect(newState.tasksList[0].done).toEqual(true);
  })

  it('Should delete a task', () => {})
})
