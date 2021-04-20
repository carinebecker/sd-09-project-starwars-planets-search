import React from 'react';
import { Provider } from './Context';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
