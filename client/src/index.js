import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import reducer from './reducers/rootReducer'

// const store = createStore(reducer)
// store.subscribe(() => console.log("Store: ", store.getState()))

// console.log(store.getState())
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
