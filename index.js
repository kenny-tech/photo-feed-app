import React from 'react';
import thunk from "redux-thunk";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';

import App from './App';
import reducers from "./app/reducers";


const store = createStore(reducers, applyMiddleware(thunk));

const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
