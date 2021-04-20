import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';

const App = () => (
  <Provider>
    <Table />
  </Provider>
);

export default App;
