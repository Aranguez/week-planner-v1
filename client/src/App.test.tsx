import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'

//import configureStore from 'redux-mock-store'
//import thunk from 'redux-thunk'

//const middlewares = [thunk] // add your middlewares like `redux-thunk`
//const mockStore = configureStore(middlewares)

describe('start app', () => {
  //const store = mockStore({})
  const app = shallow(<App/>);

  it('renders correctly', () => {
    expect(app).toBeDefined()
  })

  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<App />, div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });
})
