import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';

const App = () => (
  <Provider>
    <NameFilter />
    <Table />
  </Provider>
);

export default App;
