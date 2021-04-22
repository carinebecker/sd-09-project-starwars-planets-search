import React from 'react';
import './App.css';

import Provider from './contexts/Provider';
import Inputs from './components/Inputs';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Inputs />
      <Table />
    </Provider>
  );
}

export default App;
