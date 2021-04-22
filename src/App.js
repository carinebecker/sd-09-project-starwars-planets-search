import React from 'react';
import Table from './Components/Table';
import TableContextProvider from './Context/TableContext';

function App() {
  return (
    <TableContextProvider>
      <Table />
    </TableContextProvider>
  );
}

export default App;
