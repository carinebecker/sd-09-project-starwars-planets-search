import React from 'react';

import Table from './components/Table';
import StarWarsProvider from './hooks/context/StarWarsProvider';

import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
