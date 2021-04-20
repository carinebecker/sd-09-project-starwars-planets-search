import React from 'react';
import Table from './components/Table';
import ContextPlanets from './context/contextPlanets';

function App() {
  return (
    <ContextPlanets>
      <Table />
    </ContextPlanets>
  );
}

export default App;
