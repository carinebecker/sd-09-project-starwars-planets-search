import React from 'react';
import Table from './components/Table';
import FetchProvider from './context/FetchProvider';
import './App.css';

function App() {
  return (
    <main>
      <FetchProvider>
        <Table />
      </FetchProvider>
    </main>
  );
}

export default App;
