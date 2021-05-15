import React from 'react';
import Table from './components/Table';
import DataApiContextProvider from './context/DataApi';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <DataApiContextProvider>
      <SearchBar />
      <Table />
    </DataApiContextProvider>
  );
}

export default App;
