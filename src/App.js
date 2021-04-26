import React from 'react';
import './App.css';
import TablePlanets from './components/TablePlanets';
import Provider from './contextAPI/provider';

function App() {
  return (
    <Provider>
      <TablePlanets />
    </Provider>
  );
}

export default App;
