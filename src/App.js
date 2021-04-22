import React from 'react';
import './App.css';
import TablePlanets from './components/TablePlanets';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <h1>StarWars Planets</h1>
      <TablePlanets />
    </SWProvider>
  );
}

export default App;
