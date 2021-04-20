import React from 'react';
import './App.css';
import Table from './Components/Table';
import FilterInput from './Components/FilterInput';
import ApiProvider from './contexts/ApiContext/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <FilterInput />
      <Table />
    </ApiProvider>
  );
}

export default App;
