import React from 'react';
import AppProvider from './appContext/Provider';
import BigOrSmaller from './components/BigOrSmaller';
import FilterButton from './components/FilterButton';
import FilterName from './components/FilterName';
import Table from './components/Table';
import InputValue from './components/InputValue';
import SelectColumn from './components/SelectColumn';

function App() {
  return (
    <div>
      <AppProvider>
        <Table />
        <FilterName />
        <SelectColumn />
        <BigOrSmaller />
        <InputValue />
        <FilterButton />
      </AppProvider>
    </div>
  );
}

export default App;
