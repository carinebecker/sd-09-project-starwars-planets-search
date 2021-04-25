import React from 'react';
import Table from './components/Table';
import DataApiContextProvider from './context/DataApi';
import './App.css';

function App() {
  return (
    <DataApiContextProvider>
      <Table />
    </DataApiContextProvider>
  );
}

export default App;
