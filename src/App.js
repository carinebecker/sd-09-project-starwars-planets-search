import React from 'react';
import './App.css';
import Table from './components/Table';
import { TableContextProvider } from './contexts/TableContext';

function App() {
  return (
    <TableContextProvider>
      <Table />
    </TableContextProvider>
  );
}

export default App;
