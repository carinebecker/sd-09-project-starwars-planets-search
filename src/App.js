import React from 'react';
import './App.css';
import InputSearch from './components/InputSearch';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProviders';

function App() {
  return (
    <PlanetsProvider>
      <InputSearch />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
