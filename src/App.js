import React from 'react';
import { Provider } from './context/Planets';
import Table from './components/Table';
import TableFiltered from './components/TableFiltered';
import './App.css';

function App() {
  return (
    <Provider>
      <TableFiltered />
      <Table />

    </Provider>
  );
}

export default App;
