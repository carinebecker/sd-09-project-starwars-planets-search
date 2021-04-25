import React from 'react';

import DataProvider from './context/DataContext';
import UserProvider from './context/UserContext';
import Table from './components/Table';

import './App.css';

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <span>Hello, App!</span>
        <Table />
      </UserProvider>
    </DataProvider>
  );
}

export default App;
