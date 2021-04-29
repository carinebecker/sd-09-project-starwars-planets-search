import React from 'react';
import './App.css';
import Filters from './common/components/Filters';
import Table from './common/components/Table';
import PlanetProvider from './context/PlanetProvider.jsx';

function App() {
  return (
    <PlanetProvider>
      <Filters />
      <Table />
    </PlanetProvider>
  );
}

export default App;
