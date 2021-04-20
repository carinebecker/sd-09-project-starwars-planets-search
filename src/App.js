import React from 'react';
import FilterInputs from './components/FilterInputs';
import Table from './components/table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <FilterInputs />
      <Table />
    </Provider>
  );
}

export default App;
