import React from 'react';
import Table from './Components/Table';
import Input from './Components/Input';
import Provider from './Context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <Input />
      <Table />
    </Provider>
  );
}

export default App;
