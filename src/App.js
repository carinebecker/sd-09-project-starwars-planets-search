import React from 'react';
import { Header, Table } from './components';
import PlanetsProvider from './context/PlanetsProvider';
import './css/App.css';

function App() {
  return (
    <PlanetsProvider>
      <div className="align-text">
        <Header />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
