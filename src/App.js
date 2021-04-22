import React from 'react';
import './App.css';
import FilterForm from './components/FilterForm';
import { PlanetsProvider } from './components/Providers';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <FilterForm />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
