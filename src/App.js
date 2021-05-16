import React from 'react';
import Table from './Components/Table';
import ApiContextProvider from './Context/DataApi';
import './App.css';

function App() {
  return (
    <ApiContextProvider>
      <Table />
    </ApiContextProvider>
  );
}

export default App;
