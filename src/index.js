import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';


const initialState = {
  city: null,
  search_bar: false,
  setting_bar: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_CITY':
      return {...state, ...{
        city: action.payload,
      }};
    case 'CLICK_SEARCH_BAR':
      return {...state, ...{
        search_bar: action.payload,
      }};
    case 'CLICK_SETTING_BAR':
      return {...state, ...{
        setting_bar: action.payload,
      }};
    default:
      return state;
  }
}

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
