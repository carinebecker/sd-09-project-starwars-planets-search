import React from 'react';
import PlanetsProvider from './context/Planets';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <div className="App">
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
