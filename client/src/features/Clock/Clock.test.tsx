//TODO: Test
import React from 'react';
//import ReactDOM from 'react-dom';
import Clock from './Clock';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Clock />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})