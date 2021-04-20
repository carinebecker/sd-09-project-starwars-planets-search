import React from 'react';
import { Provider } from './context/Provider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <span>Hello</span>
        <Table />
      </div>
    </Provider>
  );
}

export default App;
