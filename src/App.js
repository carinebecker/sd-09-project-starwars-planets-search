import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumber';
// import FilterList from './components/FilterList';

function App() {
  return (
    <main>
      <Provider>
        <FilterByName />
        <FilterByNumber />
        {/* <FilterList /> */}
        <Table />
      </Provider>
    </main>
  );
}

export default App;
