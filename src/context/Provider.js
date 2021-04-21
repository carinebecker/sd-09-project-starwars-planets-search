import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import getAPI from '../services/getAPI';

const filterName = (data, filter) => data.filter(({ name }) => name.includes(filter));

const filterByNumber = (data, filter) => (
  data.filter((planet) => (
    filter.every(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        return +(planet[column]) > value;
      case 'menor que':
        return +(planet[column]) < value;
      case 'igual a':
        return +(planet[column]) === +(value);
      default:
        return true;
      }
    })
  ))
);

const organize = (column, a, b) => {
  const NEGATIVE_SORT = -1;
  if (column !== 'name') {
    if (+(a[column]) > +(b[column])) return 1;
    if (+(b[column]) > +(a[column])) return NEGATIVE_SORT;
    return 0;
  }
  if (a[column] > b[column]) return 1;
  if (b[column] > a[column]) return NEGATIVE_SORT;
  return 0;
};

const sortQuery = (data, { sort, column }) => {
  if (data.length > 0) {
    switch (sort) {
    case 'ASC':
      return data.sort((a, b) => organize(column, a, b));
    case 'DESC':
      return data.sort((a, b) => organize(column, b, a));
    default:
      return data;
    }
  }
};

const setFilters = (data, filter) => {
  const { filterByName: { name }, filterByNumericValues } = filter;
  let newData = [...data];
  if (name) {
    newData = filterName(data, name);
  }
  if (filterByNumericValues.length > 0) {
    newData = filterByNumber(newData, filterByNumericValues);
  }
  newData = sortQuery(newData, filter.order);
  return newData;
};

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
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
  });

  useEffect(() => {
    async function getData() {
      const obj = await getAPI();
      setPlanets(obj.results);
      setLoading(false);
    }
    getData();
  }, [setPlanets]);

  const data = setFilters(planets, filter.filters);

  const store = {
    data,
    loading,
    setFilter,
    filter,
  };

  return (
    <context.Provider value={ store }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
