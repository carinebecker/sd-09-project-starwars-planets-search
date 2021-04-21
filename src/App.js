import React from 'react';
import './App.css';
import Table from './Components/Table';
import FilterInput from './Components/FilterInput';
import FilterPopulation from './Components/FilterPopulation';
import ApiProvider from './contexts/ApiContext/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <FilterInput />
      <FilterPopulation />
      <Table />
    </ApiProvider>
  );
}

export default App;
