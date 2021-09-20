import React from 'react';
import Table from './components/Table';
import './App.css';
import TableProvider from './context/TableProvider';
import Filters from './components/Filters';

function App() {
  return (
    <div>
      <header>
        <span>Star Wars Planets Search!</span>
      </header>
      {/* OBRIGADA LUCIANO LODI PELA AJUDA 🙏🏻 */}
      <TableProvider>
        <Filters />
        <Table />
      </TableProvider>
    </div>
  );
}

export default App;
