import React from 'react';
import './App.css';
import Table from './components/Table';
import Inputs from './components/Inputs';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Inputs />
      <Table />
    </TableProvider>
  );
}

export default App;
