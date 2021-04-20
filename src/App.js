import React from 'react';
import { Provider } from './context/Provider';
import Table from './components/Table';
import TextFilter from './components/TextFilter';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <TextFilter />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
