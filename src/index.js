import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlanetsProvider from './Context/PlanetsProvider';

ReactDOM.render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>,
  document.getElementById('root'),
);
