import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumber';

function App() {
  return (
    <main>
      <Provider>
        <FilterByName />
        <FilterByNumber />
        <Table />
      </Provider>
    </main>
  );
}

export default App;
