import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import SearchByName from './components/SearchByName';
import SelectByNumber from './components/SelectByNumber';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>TkdCris_App</h1>
      <SearchByName />
      <SelectByNumber />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
