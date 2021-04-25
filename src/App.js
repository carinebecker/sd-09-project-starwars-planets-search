import React from 'react';

import DataProvider from './context/DataContext';
import UserProvider from './context/UserContext';
import Table from './components/Table';
import InputName from './components/InputName';

import './App.css';
import NumericFilters from './components/NumericFilters';

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <span>Hello, App!</span>
        <InputName />
        <NumericFilters />
        <Table />
      </UserProvider>
    </DataProvider>
  );
}

export default App;
