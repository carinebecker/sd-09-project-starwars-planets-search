import React from 'react';
import './App.css';
import PlanetsTable from './components/PlanetsTable';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <span>Hello, App!</span>
      <PlanetsTable />
    </SWProvider>
  );
}

export default App;
