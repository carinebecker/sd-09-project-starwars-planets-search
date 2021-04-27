import React from 'react';
import Table from './components/Table';
import DataApiContextProvider from './context/DataApi';
import './App.css';
import Filters from './components/Filters';

function App() {
  return (
    <DataApiContextProvider>
      <Filters />
      <Table />
    </DataApiContextProvider>
  );
}

export default App;
