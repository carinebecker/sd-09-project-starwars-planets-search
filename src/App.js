import React from 'react';
import ProviderContext from './context/PorviderContext';
import './App.css';
import DataTablePlanets from './component/DataTablePlanets';

function App() {
  return (
    <ProviderContext>
      <DataTablePlanets />
    </ProviderContext>
  );
}

export default App;
