import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/Api';

import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const INITIAL_STATE = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  };

  const INITIAL_COLUMNS = ['rotation_period', 'orbital_period',
    'surface_water', 'population'];

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);

  const getPlanets = async () => {
    const planets = await planetsAPI();
    const { results } = planets;
    results.map((obj) => delete obj.residents);
    setData(results);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  // Código feito com ajuda de colegas da turma do Discord
  useEffect(() => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    const { column, comparison,
      value } = filterByNumericValues[filterByNumericValues.length - 1];
    const planetsFilteredByName = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    if (comparison === 'maior que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      setFilterPlanets(result);
    }
    if (comparison === 'menor que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      setFilterPlanets(result);
    }
    if (comparison === 'igual a') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      setFilterPlanets(result);
    }
    if (comparison === '') {
      setFilterPlanets(planetsFilteredByName);
    }
  }, [data, filters]);

  return (
    <StarWarsContext.Provider
      value={ {
        data,
        filters,
        setData,
        setFilters,
        filterPlanets,
        setFilterPlanets,
        columns,
        setColumns,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
