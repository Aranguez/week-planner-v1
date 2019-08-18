import React from 'react';
//import ReactDOM from 'react-dom';
import Slider from './Slider';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Slider/>);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})