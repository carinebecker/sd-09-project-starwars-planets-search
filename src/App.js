import React from 'react';
import './App.css';
import FilterForm from './components/FiltersForm';
import Table from './components/Table';
import PlanetProvider from './context/Planets';

function App() {
  return (
    <PlanetProvider>
      <div>
        <FilterForm />
        <Table />
      </div>
    </PlanetProvider>

  );
}

export default App;
