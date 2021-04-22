import React from 'react';
import './App.css';
import StateProvider from './context/stateProvider';
import Table from './components/Table';
import RemoveFilter from './components/RemoveFilter';
import AddFilters from './components/AddFilters';

function App() {
  return (
    <StateProvider>
      <AddFilters />
      <RemoveFilter />
      <Table />
    </StateProvider>
  );
}

export default App;
