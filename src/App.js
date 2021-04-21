import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Filters from './components/Filters';

const App = () => (
  <Provider>
    <NameFilter />
    <NumericFilter />
    <Filters />
    <Table />
  </Provider>
);

export default App;
