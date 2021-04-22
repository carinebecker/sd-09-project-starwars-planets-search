import React from 'react';
import './App.css';
import SWHeader from './components/SWHeader';
import TablePlanets from './components/TablePlanets';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <SWHeader />
      <TablePlanets />
    </SWProvider>
  );
}

export default App;
