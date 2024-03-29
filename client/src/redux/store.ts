import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//importar los reducers
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
