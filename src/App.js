import React from 'react';
import Table from './components/Table';
import DataApiContextProvider from './context/DataApi';
import './App.css';
import SearchBar from './components/SearchBar';
import FiltersManager from './components/FiltersManager';
import SortColumns from './components/SortColumns';

function App() {
  return (
    <DataApiContextProvider>
      <SearchBar />
      <FiltersManager />
      <SortColumns />
      <Table />
    </DataApiContextProvider>
  );
}

export default App;
