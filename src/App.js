import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <span>Que a força esteja com você!</span>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
