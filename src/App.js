import React, { useEffect, useState } from 'react';
import './App.css';
import NumericFilters from './components/NumericFilters';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    const apiUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(apiUrl).then((res) => res.json()).then(({ results }) => setPlanets(results));
  }, []);

  useEffect(() => {
    const nameFilter = (planet) => planet.name.includes(name);
    const numericFilter = (planet) => filters.every(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return false;
      }
    });
    // const filtered = planets.filter((planet) => nameFilter(planet) && numericFilter(planet));
    const filtered = planets.filter(nameFilter).filter(numericFilter);
    setFilteredPlanets(filtered);
  }, [name, planets, filters]);

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ name }
        onChange={ ({ target }) => setName(target.value) }
      />
      <NumericFilters onClick={ (newFilter) => setFilters([...filters, newFilter]) } />
      <Table planets={ filteredPlanets } />
    </div>
  );
}

export default App;
