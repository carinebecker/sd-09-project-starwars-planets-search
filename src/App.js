import React from 'react';
import './App.css';
import Table from './components/Table';
import TableFiltered from './components/TableFiltered';
import { Provider } from './MyContext';

function App() {
  return (
    <Provider>
      <TableFiltered />
      <Table />
    </Provider>
  );
}

export default App;
