import React from 'react';
import './App.css';
import Filter from './components/Filter';
import PlanetsProvider from './context/Planets';
import Planets from './pages/Planets';
import Sort from './components/Sort';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <Filter />
        <Sort />
        <Planets />
      </PlanetsProvider>
    </div>
  );
}

export default App;
