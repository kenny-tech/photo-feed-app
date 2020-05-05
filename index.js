import React from 'react';
import thunk from "redux-thunk";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';

import App from './App';
import reducers from "./app/reducers";

// const store = createStore(reducers, applyMiddleware(thunk));

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
    ,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
