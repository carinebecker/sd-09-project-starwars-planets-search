import React from 'react';
import Table from './components/Table';
import './App.css';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <div>
      <span>Planets search!</span>
      {/* OBRIGADA LUCIANO LODI PELA AJUDA 🙏🏻 */}
      <TableProvider>
        <Table />
      </TableProvider>
    </div>
  );
}

export default App;
