import React from 'react';
//import ReactDOM from 'react-dom';
import Nav from './Nav';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Nav/>);

  it('renders correctly', () => {
    expect(component).toBeDefined()
  })
})