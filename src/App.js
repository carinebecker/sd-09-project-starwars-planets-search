import React from 'react';
import Provider from './Context/Provider';
import Table from './Components/Table';
import NameFilter from './Components/NameFilter';
import NumericFilter from './Components/NumericFilter';
import './App.css';

function App() {
  return (
    <Provider>
      <NameFilter />
      <NumericFilter />
      <Table />
    </Provider>
  );
}

export default App;
