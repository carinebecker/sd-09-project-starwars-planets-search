import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './pages/Table';

function App() {
  return (
    <Provider>
      <div>
        <Table />
      </div>
    </Provider>
  );
}

export default App;
