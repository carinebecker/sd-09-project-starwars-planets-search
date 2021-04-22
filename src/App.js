import React from 'react';
import './App.css';
import FilterForm from './components/FilterForm';
import Provider from './components/Provider';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <FilterForm />
      <Table />
    </Provider>
  );
}

export default App;
