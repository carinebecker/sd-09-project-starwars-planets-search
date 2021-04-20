import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterButtons from './components/FilterButtons';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <FilterButtons />
        <Table />
      </StarWarsProvider>
    </div>

  );
}

export default App;
