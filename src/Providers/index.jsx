import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';
import getPlanetList from '../services/PlanetList';

function Provider({ children }) {
  const initialState = {
    data: [],
    loading: true,
    filterDone: false,
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
  };

  const [state, setState] = useState(initialState);

  const handleChange = ({ name, value }) => {
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
  };

  const handleDropdown = ({ column, comparison, value }) => {
    const objFilter = {
      column,
      comparison,
      value,
    };

    setState((prevState) => ({
      ...prevState,
      filterDone: true,
      filters: {
        ...prevState.filters,
        filterByNumericValues: [
          ...prevState.filters.filterByNumericValues,
          objFilter,
        ],
      },
    }));
  };

  const doFilter = (filter, data) => {
    const index = filter.length - 1;
    const { column, comparison, value } = filter[index];

    const result = data.filter(
      (element) => {
        if (
          comparison === 'maior que'
          && parseInt(element[column], 10) > parseInt(value, 10)
        ) {
          return element;
        }

        if (
          comparison === 'menor que'
          && parseInt(element[column], 10) < parseInt(value, 10)
        ) {
          return element;
        }

        if (
          comparison === 'igual a'
          && parseInt(element[column], 10) === parseInt(value, 10)
        ) {
          return element;
        }

        return null;
      },
    );
    return result;
  };

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
    handleDropdown,
    doFilter,
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
