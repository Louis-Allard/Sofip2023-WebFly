import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importez Provider depuis react-redux
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store'; // Importez votre store Redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Enveloppez votre application avec Provider et fournissez le store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
