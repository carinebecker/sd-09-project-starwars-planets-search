import React from 'react';
import './App.css';
import { StarWarsProvider } from './context/index';
import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <span>Hello, App!</span>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
