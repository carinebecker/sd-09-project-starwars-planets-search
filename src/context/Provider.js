import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import getAPI from '../services/getAPI';

const filterName = (data, filter) => data.filter(({ name }) => name.includes(filter));
function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
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

  const data = filterName(planets, filter.filters.filterByName.name);

  const store = {
    data,
    loading,
    setFilter,
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
