import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const apiUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(apiUrl).then((res) => res.json()).then(({ results }) => setPlanets(results));
  }, []);

  return (
    <Table planets={ planets } />
  );
}

export default App;
