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
    order: {
      column: 'name',
      sort: 'ASC',
    },
  },
};

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filtered, setFilter] = useState(FILTER);
  const [filterBtn, setFilterBtn] = useState(false);
  const [planet, setPlanet] = useState([]);

  // ref. Gabriel Pires (18/05/2021): https://medium.com/@gpiress/reactjs-tabela-do-brasileir%C3%A3o-722a3cdf27c5

  const compareDataASC = (dataA, dataB) => {
    const columnToSort = filtered.filters.order.column;
    const num = -1;
    const test = +dataA[columnToSort];

    if (!test) {
      if (Object.prototype.hasOwnProperty.call(!dataA, columnToSort)
      || Object.prototype.hasOwnProperty.call(!dataB, columnToSort)) {
        return 0;
      }
      if (dataA[columnToSort] < dataB[columnToSort]) {
        return num;
      }
      if (dataA[columnToSort] > dataB[columnToSort]) {
        return 1;
      }
      return 0;
    }
    if (Object.prototype.hasOwnProperty.call(!dataA, columnToSort)
    || Object.prototype.hasOwnProperty.call(!dataB, columnToSort)) {
      return 0;
    }
    if (+dataA[columnToSort] < +dataB[columnToSort]) {
      return num;
    }
    if (+dataA[columnToSort] > +dataB[columnToSort]) {
      return 1;
    }
    return 0;
  };

  const compareDataDESC = (dataA, dataB) => {
    const columnToSort = filtered.filters.order.column;
    const num = -1;
    const test = +dataA[columnToSort];

    if (test && !NaN && test !== 'unknown') {
      if (Object.prototype.hasOwnProperty.call(!dataA, columnToSort)
      || Object.prototype.hasOwnProperty.call(!dataB, columnToSort)) {
        return 0;
      }
      if (+dataA[columnToSort] > +dataB[columnToSort]) {
        return num;
      }
      if (+dataA[columnToSort] < +dataB[columnToSort]) {
        return 1;
      }
      return 0;
    }
    if (Object.prototype.hasOwnProperty.call(!dataA, columnToSort)
    || Object.prototype.hasOwnProperty.call(!dataB, columnToSort)) {
      return 0;
    }
    if (dataA[columnToSort] > dataB[columnToSort]) {
      return num;
    }
    if (dataA[columnToSort] < dataB[columnToSort]) {
      return 1;
    }
    return 0;
  };

  const takesSortedData = () => {
    const orderSort = filtered.filters.order.sort;
    if (orderSort === 'ASC') {
      const sortedData = data.sort(compareDataASC);
      return sortedData;
    }
    const sortedData = data.sort(compareDataDESC);
    return sortedData;
  };

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
        ...filtered.filters,
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
        ...filtered.filters,
        filterByNumericValues: [...filtered.filters.filterByNumericValues, value],
      },
    });
    setFilterBtn(true);
  };

  const titles = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'created', 'edited',
    'films', 'url'];

  const setOrderColumn = (param) => {
    setFilter({
      ...filtered,
      filters: {
        ...filtered.filters,
        order: param,
      },
    });
  };

  const contextValue = { btnFilter,
    data,
    filterBtn,
    filterColumn,
    filtered,
    getData,
    planet,
    setFilter,
    setFilterBtn,
    setFilterName,
    setOrderColumn,
    takesSortedData,
    titles,
    updatePlanet };

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
