import React from 'react';
//import ReactDOM from 'react-dom';
import Config from './Config';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Config/>);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})