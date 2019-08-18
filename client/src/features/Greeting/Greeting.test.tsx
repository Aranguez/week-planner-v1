import React from 'react';
//import ReactDOM from 'react-dom';
import Greeting from './Greeting';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Greeting/>);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})