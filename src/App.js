import React from 'react';
import './App.css';
import FilterName from './components/FilterName';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <header>
        <h1>Starwars Planets Search</h1>
      </header>
      <main>
        <FilterName />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
