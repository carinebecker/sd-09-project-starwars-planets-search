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
    order: {
      column: 'name',
      sort: '',
    },
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

  const compare = (planet1, planet2) => {
    const { order } = filters;
    const magicNumber = -1;
    if (order.sort === 'ASC') {
      return (planet1 > planet2) ? 1 : magicNumber;
    }
    if (order.sort === 'DESC') {
      return (planet2 > planet1) ? 1 : magicNumber;
    }
    return 0;
  };

  const sortPlanets = (planets) => {
    const { order: { column } } = filters;
    planets.sort((planet1, planet2) => {
      const A = (column === 'name') ? planet1[column] : parseInt(planet1[column], 10);
      const B = (column === 'name') ? planet2[column] : parseInt(planet2[column], 10);
      return compare(A, B);
    });
  };

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
      sortPlanets(result);
    }
    if (comparison === 'menor que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      setFilterPlanets(result);
      sortPlanets(result);
    }
    if (comparison === 'igual a') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      setFilterPlanets(result);
      sortPlanets(result);
    }
    if (comparison === '') {
      setFilterPlanets(planetsFilteredByName);
      sortPlanets(planetsFilteredByName);
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
        // ordenation,
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
