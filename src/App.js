import React from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsContext from './Context/StarWarsContext';

function App() {
  return (
    <StarWarsContext.Provider>
      <span>Hello, App!</span>
      <Table />
    </StarWarsContext.Provider>
  );
}

export default App;
