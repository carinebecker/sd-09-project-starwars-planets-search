import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const initialState = {
    data: [],
    isLoading: true,
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [{
        column: '',
        comparison: '',
        value: '0',
      }],
    },
  };

  // const [data, setDataPlanets]
  // const INITIAL_COLUMN_STATE = [
  //   'population',
  //   'orbital_period',
  //   'diameter',
  //   'rotation_period',
  //   'surface_water',
  // ];

  const [state, setState] = useState(initialState);
  const [sortBy, setSortBy] = useState({ sortByColumn: 'name', sortType: 'ASC' });
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // useEffect(() => {
  //   async function getPlanetsFromAPI() {
  //     const response = await fetchPlanets();
  //     setState((last) => ({ ...last, data: response, isLoading: false }));
  //   }
  //   getPlanetsFromAPI();
  // }, []);

  function handleInput({ name, value }) {
    setState((lastState) => ({
      ...lastState,
      filters: {
        ...lastState.filters,
        filterByName: {
          ...lastState.filterByName,
          [name]: value,
        },
      },
    }));
  }

  function handleFilteredInputs(object) {
    console.log(columnOptions);
    setColumnOptions(columnOptions
      .filter((option) => option !== object.column));
    setState((lastState) => ({
      ...lastState,
      filters: {
        ...lastState.filters,
        filterByNumericValues: [object],
      },
    }));
    console.log(columnOptions);
  }

  const setSortBySelection = (results, sortSelector) => {
    const noMagicNumber = -1;
    if (sortSelector === 'name') {
      return results.sort((a, b) => {
        if (a[sortSelector] > b[sortSelector]) {
          return 1;
        }
        return noMagicNumber;
      });
    }
  };

  const context = {
    ...state,
    columnOptions,
    sortBy,
    setSortBy,
    handleInput,
    handleFilteredInputs,
    setSortBySelection,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
