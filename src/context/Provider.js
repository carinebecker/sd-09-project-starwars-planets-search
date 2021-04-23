import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getStarWarsData } from '../services/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataFilterByName, setDataFilterByName] = useState([]);
  const [filters, setFilters] = useState(
    { filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: 0,
      },
    ] },
  );
  const getData = async () => {
    const dataStarWars = await getStarWarsData();
    setData(dataStarWars);
    setDataFilterByName(dataStarWars);
  };

  function saveFilter({ target }) {
    const { value, name } = target;
    if (name === 'name') {
      setFilters(
        { ...filters,
          filterByName: { [name]: value } },
      );
    } else {
      setFilters(
        { ...filters,
          filterByNumericValues: [
            {
              ...filters.filterByNumericValues[0],
              [name]: value,
            },
          ],
        },
      );
    }
  }
  const handleChangeFilter = () => {
    const { column, comparison, value } = filters.filterByNumericValues[0];
    const newData = dataFilterByName.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setDataFilterByName(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const newData = data.filter((planet) => planet.name.toLowerCase()
      .includes(filters.filterByName.name));
    setDataFilterByName(newData);
  }, [data, filters.filterByName.name]);

  const context = {
    dataFilterByName,
    filters,
    saveFilter,
    handleChangeFilter,
  };

  return (
    <StarWarsContext.Provider
      value={ context }
    >
      { children }
    </StarWarsContext.Provider>

  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
