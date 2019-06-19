import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('start app', () => {

  const app = shallow(<App/>)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  }),

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})


