import React, { useContext } from 'react';
import StarWarsContext from './Context/StarWarsContext';
import './App.css';
import Table from './components/Table/Table';

function App() {
  const { isFetching, data } = useContext(StarWarsContext);
  console.log(isFetching);
  if (!isFetching && data) {
    console.log(data)
  }
  return (
    <main>
      <h1>Star Wars Planets Search</h1>
      {/* <Table /> */}
      {}
    </main>
  );
}

export default App;
