import React from 'react';
import './App.css';
import Table from './Components/Table';
import ApiProvider from './contexts/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <Table />
    </ApiProvider>
  );
}

export default App;
