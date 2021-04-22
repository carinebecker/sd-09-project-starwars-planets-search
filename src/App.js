import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import FilterByName from './components/FilterByName';
import FilterByNumericValue from './components/FilterByNumericValue';
import StarWarsTable from './components/StarWarsTable';

function App() {
  return (
    <PlanetsProvider>
      <FilterByName />
      <FilterByNumericValue />
      <StarWarsTable />
    </PlanetsProvider>
  );
}

export default App;
