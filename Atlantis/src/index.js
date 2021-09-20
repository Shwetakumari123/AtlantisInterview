/* eslint-disable eol-last */
/* eslint-disable no-extra-semi */
/* eslint-disable prettier/prettier */
import React from 'react';
 import { Provider } from 'react-redux';
import Home from './screens/home/home';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
  return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}> 
        <Home />
       </PersistGate>
     </Provider>
  );
};