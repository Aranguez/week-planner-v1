import React from 'react';
//import ReactDOM from 'react-dom';
import Notification from './Notification';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Notification/>);

  it('renders correctly', () => {
    expect(component).toBeDefined()
  })
})