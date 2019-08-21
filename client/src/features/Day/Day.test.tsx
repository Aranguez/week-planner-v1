import React from 'react';
//import ReactDOM from 'react-dom';
import Day from './Day';
import { shallow } from 'enzyme'

const props = {
  tasks: [],
  engDay: '',
  day: '',
  today: false,
  onHandleModal: () => {},
  over: false;
}

describe('start app', () => {
  //const store = mockStore({})
  const component = shallow(<Day {...props} />);

  it('renders correctly', () => {
    expect(component).toBeDefined()
  })
})