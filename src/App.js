import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Table from './component/Table';
import './App.css';

function App() {
  return (
    <main>
      <PlanetProvider>
        <Table />
      </PlanetProvider>
    </main>
  );
}
export default App;
