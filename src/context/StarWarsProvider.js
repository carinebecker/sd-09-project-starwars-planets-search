import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';

import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/starWarsAPI';

const createFilters = () => ({
  filters: {
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
  },
});

const StarWarsProvider = (({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(createFilters());
  const [filterValue, setFilterValue] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterComparison, setFilterComparison] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setData(await getPlanets());
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const context = {
    data,
    filters,
    setFilters,
    filterValue,
    setFilterValue,
    filterColumn,
    setFilterColumn,
    filterComparison,
    setFilterComparison,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
});

StarWarsProvider.propTypes = {
  children: node.isRequired,
};

export default StarWarsProvider;
