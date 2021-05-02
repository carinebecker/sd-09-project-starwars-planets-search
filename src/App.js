import React from 'react';
import { Header, Table, Filter } from './components';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
