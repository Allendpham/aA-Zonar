import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from "./context/Modal";
import { ModalsProvider } from './context/userMenuModal';
export const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ModalProvider>
      <ModalsProvider>
        <App />

      </ModalsProvider>
    </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
