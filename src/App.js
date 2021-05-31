import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <StarWarsProvider>
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
