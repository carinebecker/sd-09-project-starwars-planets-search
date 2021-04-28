import React from 'react';
import Table from './components/Table';
import './App.css';
import TableProvider from './context/TableProvider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div>
      <span>Planets search!</span>
      <SearchBar />
      {/* OBRIGADA LUCIANO LODI PELA AJUDA 🙏🏻 */}
      <TableProvider>
        <Table />
      </TableProvider>
    </div>
  );
}

export default App;
