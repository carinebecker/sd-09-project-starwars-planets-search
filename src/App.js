import React from 'react';
import './App.css';
import Table from './components/Table';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <div>
      <SWProvider>
        <Table />
      </SWProvider>
    </div>
  );
}

export default App;
