import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';
import getPlanetList from '../services/PlanetList';

function Provider({ children }) {
  const initialState = {
    data: [],
    loading: true,
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
        ...prevState.filters,
        filterByName: {
          ...prevState.filterByName,
          [name]: value,
        },
      },
    }));
  }

  useEffect(() => {
    async function planetAPI() {
      const response = await getPlanetList();
      setState((prevState) => ({
        ...prevState,
        data: response,
        loading: false,
      }));
    }
    planetAPI();
  }, []);

  const contextValue = {
    ...state,
    handleChange,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
