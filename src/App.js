import React from 'react';
import './App.css';
import Table from './components/Table';
import TableFilters from './components/TableFilters';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <TableFilters />
      <Table />
    </TableProvider>
  );
}

export default App;
