import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';

import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
//languages
import common_en from "./translations/en/common.json";
import common_jp from "./translations/jp/common.json";

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        jp: {
            common: common_jp
        },
    },
});

const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
