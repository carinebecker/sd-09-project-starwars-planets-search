import React from 'react';
import FilterPlanets from './components/FilterPlanets';
import Table from './components/Table';
import ContextPlanets from './context/contextPlanets';

function App() {
  return (
    <ContextPlanets>
      <FilterPlanets />
      <Table />
    </ContextPlanets>
  );
}

export default App;
