import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';

const App = () => (
  <Provider>
    <NameFilter />
    <NumericFilter />
    <Table />
  </Provider>
);

export default App;
