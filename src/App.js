import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import Inputs from './components/Inputs';
import './App.css';

function App() {
  return (
    <main className="App App-header">
      <Provider>
        <Inputs />
        <Table />
      </Provider>
    </main>
  );
}

export default App;
