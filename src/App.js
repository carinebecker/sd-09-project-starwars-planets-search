import React from 'react';
import Filters from './components/Filters';
import Table from './components/Table';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
