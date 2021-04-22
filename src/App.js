import React from 'react';
import './App.css';
import FilterForm from './components/FilterForm';
import { PlanetsProvider, FiltersProvider } from './components/Providers';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <FiltersProvider>
        <FilterForm />
        <Table />
      </FiltersProvider>
    </PlanetsProvider>
  );
}

export default App;
