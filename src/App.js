import React from 'react';
import { Header, Table, SearchBar } from './components';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <SearchBar />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
