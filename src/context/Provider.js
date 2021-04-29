import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getStarWarsData } from '../services/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataFilterByName, setDataFilterByName] = useState([]);
  const [namePlanets, setNamePlanets] = useState(['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [filters, setFilters] = useState(
    { filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    },
  );
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: '',
    comparison: '',
    value: 0,
  });
  const getData = async () => {
    const dataStarWars = await getStarWarsData();
    setData(dataStarWars);
    setDataFilterByName(dataStarWars);
  };

  function saveFilterName({ target }) {
    const { value } = target;
    setFilters(
      { ...filters,
        filterByName: { name: value } },
    );
  }

  const saveCustomFilter = ({ target }) => {
    const { name, value } = target;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

  const saveAllFilters = () => {
    setFilters({
      ...filters,
      filterByNumericValues:
      [...filters.filterByNumericValues, filterByNumericValues],
    });
    setNamePlanets([
      ...namePlanets.filter((planet) => planet !== filterByNumericValues.column),
    ]);
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
    saveFilterName,
    saveCustomFilter,
    saveAllFilters,
    namePlanets,
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
