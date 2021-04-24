import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import FilterByName from './components/FilterByName';
import FilterByValue from './components/FilterByValue';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <FilterByName />
      <FilterByValue />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
