import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <main className="App">
      <Provider>
        <Table />
      </Provider>
    </main>
  );
}

export default App;
