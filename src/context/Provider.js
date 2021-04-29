import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './Context';

function Provider({ children }) {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState('');
  const [options, setOptions] = useState({
    column: 'population',
    name: '',
    comparison: 'maior que',
    number: 0,
  });
  const [columnsInput, setColumnsInput] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setPlanets(results);
    setFilteredPlanets(results);
  }

  const filterPlanets = ({ target }) => {
    const { value } = target;
    setOptions({ ...options, name: value });
    const filtered = planets.filter((planet) => planet.name.includes(value));
    setFilteredPlanets(filtered);
  };

  const filterOptions = ({ target }) => {
    const { name, value } = target;
    if (name === 'column') {
      setOptions({ ...options, column: value });
    } else if (name === 'comparison') {
      setOptions({ ...options, comparison: value });
    } else {
      setOptions({ ...options, number: value });
    }
  };

  const filterColumnInput = () => {
    const { column } = options;
    const newColumn = columnsInput.filter((elemt) => elemt !== column);
    setColumnsInput(newColumn);
  };

  const filterByNumber = () => {
    const { column, comparison, number } = options;
    const numberFilter = filteredPlanets.filter((planet) => {
      if (comparison === 'maior que') {
        return (parseInt(planet[column], 10) > parseInt(number, 10));
      }
      if (comparison === 'menor que') {
        return (parseInt(planet[column], 10) < parseInt(number, 10));
      }
      if (comparison === 'igual a') {
        return (parseInt(planet[column], 10) === parseInt(number, 10));
      }
      return filteredPlanets;
    });
    setFilteredPlanets(numberFilter);
    filterColumnInput();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    planets,
    filterPlanets,
    filteredPlanets,
    filterOptions,
    filterByNumber,
    columnsInput,
  };

  return (
    <planetsContext.Provider value={ data }>
      {children}
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
