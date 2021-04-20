import React from 'react';
import { Provider } from './context';
import Search from './components/Search';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <Search />
      <Table />
    </Provider>
  );
}

export default App;
