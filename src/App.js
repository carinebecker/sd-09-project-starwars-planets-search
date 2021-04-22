import React from 'react';
import Table from './components/Table';
import './App.css';
import Provider from './context/AppProvider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Provider>
      <h1>Starwars Planet Search</h1>
      <SearchBar />
      <Table />
    </Provider>
  );
}

export default App;
