import React from 'react';
import FilterPlanetsByName from './components/FilterPlanetsByName';
import FilterPlanetsGeneral from './components/FilterPlanetsGeneral';
import Table from './components/Table';
import ContextPlanets from './context/contextPlanets';
import './App.css';
import ShowFilters from './components/ShowFilters';

function App() {
  return (
    <ContextPlanets>
      <nav className="navbar navbar-dark bg-primary">
        <div className="navbar-brand">StarWars Planet Search</div>
        <div className="form-inline">
          <div className="form-inline">
            <FilterPlanetsByName />
            {' => '}
            <FilterPlanetsGeneral />
          </div>
          <div className="nav-item-filter">
            <ShowFilters />
          </div>
        </div>
      </nav>
      <Table />
    </ContextPlanets>
  );
}

export default App;
