import React from 'react';
//import ReactDOM from 'react-dom';
import SlideMenu from './SlideMenu';
import { shallow } from 'enzyme'

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<SlideMenu/>);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})