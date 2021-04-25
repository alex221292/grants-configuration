import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {createStore, compose} from "redux";
import reducer from "./reducers";
import {Provider} from "react-redux";
import Main from './components/main/index';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  sessionKey: uuidv4()
};
const store = createStore(
  reducer,
  initialState,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
    <Provider store={store}>
      <Main/>
    </Provider>,
    document.getElementById('react')
);