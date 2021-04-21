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

const setFilters = (data, filter) => {
  const { filterByName: { name }, filterByNumericValues } = filter;
  let newData = [...data];
  if (name) {
    newData = filterName(data, name);
  }
  if (filterByNumericValues.length > 0) {
    newData = filterByNumber(newData, filterByNumericValues);
  }
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
