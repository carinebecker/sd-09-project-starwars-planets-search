import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import InputFilter from './components/InputFilter';
import StarWarsTable from './components/StarWarsTable';

function App() {
  return (
    <PlanetsProvider>
      <InputFilter />
      <StarWarsTable />
    </PlanetsProvider>
  );
}

export default App;
