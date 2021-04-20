import React from 'react';
import FilterPlanetsByName from './components/FilterPlanetsByName';
import FilterPlanetsGeneral from './components/FilterPlanetsGeneral';
import Table from './components/Table';
import ContextPlanets from './context/contextPlanets';

function App() {
  return (
    <ContextPlanets>
      <FilterPlanetsByName />
      <hr />
      <FilterPlanetsGeneral />
      <hr />
      <Table />
    </ContextPlanets>
  );
}

export default App;
