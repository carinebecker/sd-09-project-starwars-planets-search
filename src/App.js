import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';

function App() {
  return (
    <main>
      <Provider>
        <Table />
      </Provider>
    </main>
  );
}

export default App;
