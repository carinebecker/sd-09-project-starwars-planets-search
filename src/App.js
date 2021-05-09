import React from 'react';
import Routes from './routes/index';
import PlanetsContext from './context/PlanetsContext';

import './App.css';

function App() {
  return (
    <PlanetsContext>
      <Routes />
    </PlanetsContext>
  );
}

export default App;
