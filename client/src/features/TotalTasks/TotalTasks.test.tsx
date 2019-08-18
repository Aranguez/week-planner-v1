import React from 'react';
//import ReactDOM from 'react-dom';
import TotalTasks from './TotalTasks';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<TotalTasks/>);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})