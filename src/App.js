import React from 'react';
import FilterDelete from './components/FilterDelete';
import FilterInputs from './components/FilterInputs';
import Table from './components/table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <FilterInputs />
      <FilterDelete />
      <Table />
    </Provider>
  );
}

export default App;
