import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/Index';
import Table from './components/Table/Index';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <main>
        <h1>Star Wars Planets Search</h1>
        <SearchBar />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
