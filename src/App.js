import React from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './MyContext';

function App() {
  return (
    <MyContext.Provider value="Objeto do estado global aqui">
      <Table />
    </MyContext.Provider>
  );
}

export default App;
