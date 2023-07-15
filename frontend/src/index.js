import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store= {store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// make a reducer 
// combined

//  wrap under redux provider
// use it any where

// use useselector to use them anywhere
// make conditions using it
// !currentuser  -> go to login
// else take action

// stored : userslice : name n all
// videslice : like dislike all