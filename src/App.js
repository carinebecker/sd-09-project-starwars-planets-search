import React from 'react';
import { Provider } from './context';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <SearchBar />
      <Table />
    </Provider>
  );
}

export default App;
