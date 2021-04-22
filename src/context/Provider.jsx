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
    },
  };

  const [state, setState] = useState(initialState);

  function handleChange({ name, value }) {
    setState((prevState) => ({
      ...prevState,
      filters: {
        filterByName: {
          ...prevState.filterByName,
          [name]: value,
        },
      },
    }));
  }

  useEffect(() => {
    async function getPlanetsFromAPI() {
      const response = await fetchPlanets();
      setState((lastState) => ({
        ...lastState,
        data: response,
        isLoading: false,
      }));
    }
    getPlanetsFromAPI();
  }, []);

  const context = {
    ...state,
    handleChange,
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
