import React from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './context/MyContext';

function App() {
  return (
    <div>
      <Table />
    </div>
  );
}

App.contextType = MyContext;

export default App;
