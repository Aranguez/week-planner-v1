import React from 'react';
//import ReactDOM from 'react-dom';
import Timeline from './Timeline';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Timeline/>);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})