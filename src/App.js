import React from 'react';
import './App.css';
import Filters from './components/Filters';
import FiltersCreated from './components/FiltersCreated';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <header>
        <h1>Starwars Planets Search</h1>
      </header>
      <main>
        <Filters />
        <FiltersCreated />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
