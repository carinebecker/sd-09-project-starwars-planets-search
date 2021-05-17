import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import dataAPI from '../services';

const FILTER = {
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  },
};

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filtered, setFilter] = useState(FILTER);
  const [filterBtn, setFilterBtn] = useState(false);
  const [planet, setPlanet] = useState([]);

  const handleDataSuccess = (response) => {
    setData(response.results);
  };

  const getData = () => {
    dataAPI()
      .then(handleDataSuccess);
  };

  const filterColumn = () => {
    let filterPlanet = [...data];
    if (filterBtn > 0) {
      filtered.filters.filterByNumericValues.forEach((element) => {
        const { column, comparison, value } = element;
        filterPlanet = data.filter((row) => {
          const valueColumn = parseInt(row[column], 10);
          if (comparison === 'maior que') {
            return valueColumn > value;
          }
          if (comparison === 'menor que') {
            return valueColumn < value;
          }
          return String(valueColumn) === value;
        });
        setPlanet(filterPlanet);
      });
    }
  };

  useEffect(getData, []);

  const updatePlanet = () => {
    setPlanet(data);
  };

  const setFilterName = ({ target }) => {
    const { value } = target;
    setFilter({
      ...filtered,
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  };

  const btnFilter = (value) => {
    setFilter({
      ...filtered,
      filters: {
        filterByName: { ...filtered.filters.filterByName },
        filterByNumericValues: [...filtered.filters.filterByNumericValues, value],
      },
    });
    setFilterBtn(true);
  };

  const contextValue = {
    btnFilter,
    data,
    filterBtn,
    filterColumn,
    filtered,
    getData,
    planet,
    setFilter,
    setFilterBtn,
    setFilterName,
    updatePlanet,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
