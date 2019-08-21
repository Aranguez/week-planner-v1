import React from 'react';
//import ReactDOM from 'react-dom';
import WeekPlanner from './WeekPlanner';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<WeekPlanner/>);

  it('renders correctly', () => {
    expect(component).toBeDefined()
  })
})