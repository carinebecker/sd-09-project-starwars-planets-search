import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import StarWarsTable from './components/StarWarsTable';

function App() {
  return (
    <PlanetsProvider>
      <StarWarsTable />
    </PlanetsProvider>
  );
}

export default App;
