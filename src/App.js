import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import FilterByName from './components/FilterByName';
import FilterByNumericValue from './components/FilterByNumericValue';
import StarWarsTable from './components/StarWarsTable';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <FilterByName />
      <FilterByNumericValue />
      <Filters />
      <StarWarsTable />
    </PlanetsProvider>
  );
}

export default App;
