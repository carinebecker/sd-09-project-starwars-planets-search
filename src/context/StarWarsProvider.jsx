import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../services/fetchApi';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
  });

  const [initialFilter, setInitialFilter] = useState({});

  const { filterByNumericValues } = filters;

  const searchPlanetByName = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
      ...filterByNumericValues,
    });
  };

  const filterByColumn = (column, value) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          ...filterByNumericValues[0],
          [column]: value,
        },
      ],
    });
  };

  const filterByNumber = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          ...filterByNumericValues[0],
          value,
        },
      ],
    });
  };

  const handleClick = () => {
    setInitialFilter({
      ...initialFilter,
      ...filters.filterByNumericValues[0],
    });
  };

  const handleComparison = () => {
    const { column, comparison, value } = initialFilter;
    let planetas = data;
    if (comparison === 'maior que') {
      planetas = planetas.filter(
        (planeta) => parseFloat(planeta[column]) > parseFloat(value),
      );
    } else if (comparison === 'menor que') {
      planetas = planetas.filter(
        (planeta) => parseFloat(planeta[column]) < parseFloat(value),
      );
    } else if (comparison === 'igual a') {
      planetas = planetas.filter(
        (planeta) => parseFloat(planeta[column]) === parseFloat(value),
      );
    }
    return planetas;
  };

  const handleFetchApi = async () => {
    const result = await fetchApi();
    setData(result.results);
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  const contextValue = {
    data,
    filters,
    searchPlanetByName,
    filterByColumn,
    filterByNumber,
    handleClick,
    handleComparison,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
