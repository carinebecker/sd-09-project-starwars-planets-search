import React from 'react';
import './App.css';
import SWProvider from './context/SWProvider';
import PlanetsTable from './components/PlanetsTable';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <SWProvider>
      <span>StarWars Planet App!</span>
      <SearchBar />
      <PlanetsTable />
    </SWProvider>
  );
}

export default App;
