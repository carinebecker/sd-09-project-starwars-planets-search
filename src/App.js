import React from 'react';

import DataProvider from './context/DataContext';
import UserProvider from './context/UserContext';
import Table from './components/Table';
import InputName from './components/InputName';

import NumericFilters from './components/NumericFilters';
import './App.css';

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <InputName />
        <NumericFilters />
        <Table />
      </UserProvider>
    </DataProvider>
  );
}

export default App;
