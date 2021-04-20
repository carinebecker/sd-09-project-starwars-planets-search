import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanets from './getPlanets';

export const savePlanets = createContext();

function ContextPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const [height, setHeight] = useState(['maior que', 'menor que', 'igual a']);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    column: 'population',
    compare: 'maior que',
    value: '100000',
  });
  const [searchByName, setSearchByName] = useState([]);
  const [options, setOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    async function myPlanets() {
      const planetList = await getPlanets();
      setPlanets(planetList);
      setFilteredPlanets(planetList);
    }
    myPlanets();
  }, []);

  useEffect(() => {
    let filterName = [];
    filterName = planets.filter((planet) => planet.name.includes((searchByName)));
    setFilteredPlanets(filterName);
  }, [planets, searchByName]);

  const filterOptions = (e) => {
    const attribute = e.target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setFilters({ ...filters, column: e.target.value });
    } else if (attribute === 'comparison-filter') {
      setFilters({ ...filters, compare: e.target.value });
    } else {
      setFilters({ ...filters, value: e.target.value });
    }
  };

  const comparisonFilter = ({ column, compare, value }) => {
    const getFilter = planets.filter((planet) => {
      const optionValue = Number(planet[column]);
      const compareValue = Number(value);
      if (compare === 'menor que') {
        return optionValue < compareValue;
      }
      if (compare === 'maior que') {
        return optionValue > compareValue;
      }
      if (compare === 'igual a') {
        return optionValue === compareValue;
      }
    });
    setFilteredPlanets(getFilter);
  };

  const handleClick = () => {
    const lastOptions = [...options];
    const selectedOption = filters.column;
    const indexOption = lastOptions.indexOf(selectedOption);
    lastOptions.splice(indexOption, 1);
    setOptions(lastOptions);
    comparisonFilter(filters);
  };

  const data = {
    searchByName,
    setSearchByName,
    filteredPlanets,
    options,
    height,
    setHeight,
    filterOptions,
    handleClick,
  };
  return (
    <savePlanets.Provider value={ data }>
      { children }
    </savePlanets.Provider>
  );
}

ContextPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextPlanets;
