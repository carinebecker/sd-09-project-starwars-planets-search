import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextTable from './context/Provider';

ReactDOM.render(
  <ContextTable>
    <App />
  </ContextTable>,
  document.getElementById('root'),
);
