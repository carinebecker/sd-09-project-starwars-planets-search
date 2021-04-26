import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <main className="App App-header">
        <Table />
      </main>
    </Provider>
  );
}

export default App;
