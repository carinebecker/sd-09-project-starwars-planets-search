import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';

import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <Filters />
      <Table />
    </PlanetProvider>
  );
}

export default App;
