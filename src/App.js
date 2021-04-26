import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
// import Filters from './components/Filters';
// import fetchPlanets from './services/fetchPlanets';
import './App.css';

function App() {
  return (
    <Provider>
      {/* <Filters /> */}
      <Table />
    </Provider>
  );
}

export default App;
