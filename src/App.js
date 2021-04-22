import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import InputFilters from './components/InputFilters';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <h1>
          <span role="img" aria-label="world">🌎</span>
          Star Wars Planets
          <span role="img" aria-label="world">🌎</span>
        </h1>
        <InputFilters />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
