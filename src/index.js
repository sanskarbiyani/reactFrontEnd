import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { styled } from '@mui/material';
import { Provider } from 'react-redux';
import {store} from './store'

const MyComponent = styled('div')({
  margin:0,
  backgroundColor: '#f2f2f2',
  minHeight: '100vh'
});
ReactDOM.render(
  <Provider store={store}>

    {/* <MyComponent> */}
      <App  />
      
      {/* </MyComponent> */}

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
