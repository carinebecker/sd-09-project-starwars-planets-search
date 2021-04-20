import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <main>
      <StarWarsProvider>
        <Filters />
        <Table />
      </StarWarsProvider>
    </main>
  );
}

export default App;
