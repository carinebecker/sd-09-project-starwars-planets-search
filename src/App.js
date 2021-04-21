import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    const apiUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(apiUrl).then((res) => res.json()).then(({ results }) => setPlanets(results));
  }, []);

  useEffect(() => {
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(name)));
  }, [name, planets]);

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ name }
        onChange={ ({ target }) => setName(target.value) }
      />
      <Table planets={ filteredPlanets } />
    </div>
  );
}

export default App;
