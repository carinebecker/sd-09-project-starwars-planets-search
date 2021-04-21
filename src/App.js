import React from 'react';
import './App.css';
import Table from './components/Table';
import Inputs from './components/Inputs';
import Provider from './context/Provider';

const App = () => (
  <Provider>
    <Inputs />
    <Table />
  </Provider>
);

export default App;
