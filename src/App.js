import React from 'react';
import './App.css';
import Inputs from './components/Inputs';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Inputs />
      <Table />
    </Provider>
  );
}

export default App;
