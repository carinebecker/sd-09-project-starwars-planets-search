import React from 'react';
import './App.css';
import Provider from './components/Provider/Provider';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
