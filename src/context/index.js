import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import getPlanets from '../services/starWarsDatabaseApi';

export const StarWarsContext = createContext();

const getPlanetsFromApi = async (setAllPlanets, setLoading) => {
  const planets = await getPlanets();
  setAllPlanets(planets.results);
  setLoading(false);
};

const filterArray = (allPlanets, input) => {
  const arrayFilters = allPlanets.filter((e) => e.name.toLowerCase().includes(input));
  return arrayFilters;
};

const filterByNumericValues = (allPlanets, numericsValuesFilter) => {
  const { column, comparison, value } = numericsValuesFilter;
  switch (comparison) {
  case 'maior que': {
    return allPlanets.filter((e) => parseFloat(e[column]) > parseFloat(value));
  }
  case 'menor que': {
    return allPlanets.filter((e) => parseFloat(e[column]) < parseFloat(value));
  }
  case 'igual a': {
    return allPlanets.filter((e) => parseFloat(e[column]) === parseFloat(value));
  }
  default: return 0;
  }
};

export const StarWarsProvider = ({ children }) => {
  // Variaveis
  const [allPlanets, setAllPlanets] = useState([]);
  const [planetsWithFilter, setPlanetsWithFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [inputValue, setInputValue] = useState(0);
  const [selectColumn, setSelectColumn] = useState('population');
  const [selectcomparison, setSelectcomparison] = useState('maior que');
  const [filterButton, setFilterButton] = useState(0);
  const comparison = ['maior que', 'menor que', 'igual a'];
  const columns = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const filters = {
    filterByName: {
      name: input,
    },
    filterByNumericValues: [],
  };

  const numericsValuesFilter = {
    column: selectColumn,
    comparison: selectcomparison,
    value: inputValue,
  };

  // Funções
  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'value-filter') {
      if (isNaN(value) === false) {
        setInputValue(value);
      } else {
        setInputValue(0);
      }
    } else {
      setInput(value);
    }
  };

  const handleButton = () => {
    setFilterButton((currValue) => currValue + 1);
    console.log(numericsValuesFilter);
    filters.filterByNumericValues.push(numericsValuesFilter);
    console.log(filters);
    const arrayFiltered = filterByNumericValues(allPlanets, numericsValuesFilter);
    console.log(arrayFiltered);
    setPlanetsWithFilter(arrayFiltered);

  };

  const handleComparisonSelect = ({ target }) => {
    const { value } = target;
    setSelectcomparison(value);
  };

  const handleSelectCollumn = ({ target }) => {
    const { value } = target;
    setSelectColumn(value);
  };

  useEffect(() => {
    getPlanetsFromApi(setAllPlanets, setLoading);
  }, []);

  useEffect(() => {
    const arrayFilters = filterArray(allPlanets, input);
    setPlanetsWithFilter(arrayFilters);
    console.log(allPlanets);
    console.log(arrayFilters);
  }, [allPlanets, input]);

  const contextValue = { allPlanets,
    loading,
    filters,
    handleChange,
    planetsWithFilter,
    columns,
    selectColumn,
    handleSelectCollumn,
    selectcomparison,
    comparison,
    handleComparisonSelect,
    inputValue,
    handleButton,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: node.isRequired,
};
