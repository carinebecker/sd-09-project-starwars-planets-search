import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanets from './getPlanets';

export const savePlanets = createContext();

function ContextPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const [height, setHeight] = useState(['maior que', 'menor que', 'igual a']);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [storeFilters, setStoreFilters] = useState();
  const [countFilters, setCountFilters] = useState(0);
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

  useEffect(() => {
    const selectedCol = filters.column;
    const selectedComp = filters.compare;
    const selectedVal = filters.value;
    setStoreFilters(`${selectedCol} ${selectedComp} ${selectedVal}`);
  }, [countFilters]);

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
      } return optionValue === compareValue;
    });
    setFilteredPlanets(getFilter);
  };

  const handleClick = () => {
    const lastOptions = [...options];
    const selectedColumn = filters.column;
    const indexOption = lastOptions.indexOf(selectedColumn);
    lastOptions.splice(indexOption, 1);
    setOptions(lastOptions);
    comparisonFilter(filters);
    setCountFilters(countFilters + 1);
  };

  const data = {
    searchByName,
    setSearchByName,
    filteredPlanets,
    options,
    height,
    storeFilters,
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
