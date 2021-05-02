import React from 'react';
import { Header, Table } from './components';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
