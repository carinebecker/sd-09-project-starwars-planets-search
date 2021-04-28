import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import fetchApi from '../services/fetchApi';

const filterName = (data, values) => data.filter(({ name }) => name.includes(values));

const filterByNumber = (data, values) => (
  data.filter((planet) => (
    values.every(({ column, comparison, value }) => {
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

// href Vallin
const setOrder = (column, firstValue, secondValue) => {
  const magicNumber = -1;
  if (column !== 'name') {
    if (+(firstValue[column]) > +(secondValue[column])) return 1;
    if (+(secondValue[column]) > +(firstValue[column])) return magicNumber;
    return 0;
  }
  if (firstValue[column] > secondValue[column]) return 1;
  if (secondValue[column] > firstValue[column]) return magicNumber;
  return 0;
};

const filterSort = (data, { sort, column }) => {
  if (data.length > 0) {
    switch (sort) {
    case 'ASC':
      return data.sort(
        (firstValue, secondValue) => setOrder(column, firstValue, secondValue),
      );
    case 'DESC':
      return data.sort(
        (firstValue, secondValue) => setOrder(column, secondValue, firstValue),
      );
    default:
      return data;
    }
  }
};

const setFilters = (data, values) => {
  const { filterByName: { name }, filterByNumericValues } = values;
  let newData = [...data];
  if (name) {
    newData = filterName(data, name);
  }
  if (filterByNumericValues.length > 0) {
    newData = filterByNumber(newData, filterByNumericValues);
  }
  newData = filterSort(newData, values.order);
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
      const response = await fetchApi();
      setPlanets(response.results);
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
