import React from 'react';
import './App.css';
import Filter from './components/Filter';
import PlanetsProvider from './context/Planets';
import Planets from './pages/Planets';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <Filter />
        <Planets />
      </PlanetsProvider>
    </div>
  );
}

export default App;
