import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Filters from './components/Filters';
import SortInput from './components/SortInput';

const App = () => (
  <Provider>
    <NameFilter />
    <NumericFilter />
    <SortInput />
    <Filters />
    <Table />
  </Provider>
);

export default App;
