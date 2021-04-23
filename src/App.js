import React from 'react';
import './App.css';
import DropDownSearch from './components/DropDownSearch';
import InputSearch from './components/InputSearch';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProviders';

function App() {
  return (
    <PlanetsProvider>
      <InputSearch />
      <DropDownSearch />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
