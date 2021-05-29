import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterByName from './components/FilterByName';

function App() {
  return (
    <main>
      <Provider>
        <FilterByName />
        <Table />
      </Provider>
    </main>
  );
}

export default App;
