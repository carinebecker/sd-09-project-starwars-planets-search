// Provider

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import planetsAPI from '../service';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
    reRender: false,
  });
  const [planetsFilters, setPlanetsFilters] = useState([]);

  const one = 1;
  const zero = 0;
  const minusOne = -1;

  const fetchPlanets = async () => {
    const { results } = await planetsAPI();
    const expected = results.filter((result) => delete result.residents);
    expected.sort((a, b) => {
      if (a.name > b.name) {
        return one;
      }
      if (a.name < b.name) {
        return minusOne;
      }
      return zero;
    });
    setPlanets(expected);
    setPlanetsFilters(expected);
  };

  function filteredName() {
    if (!filters.filterByName) return undefined;
    return (planets
      .filter((planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase())));
  }

  // function auxiliaryFilters(filteredResult) {
  //   filters.filterByNumericValues.forEach((filteredNumeric) => {
  //     filteredResult = filteredResult.filter((filtrado) => {
  //       switch (filteredNumeric.comparison) {
  //       case 'maior que':
  //         if (parseInt(filtrado[filteredNumeric.column],
  //           10) > parseInt(filteredNumeric.value, 10)) return true;
  //         break;
  //       case 'menor que':
  //         if (parseInt(filtrado[filteredNumeric.column],
  //           10) < parseInt(filteredNumeric.value, 10)) return true;
  //         break;
  //       case 'igual a':
  //         if (parseInt(filtrado[filteredNumeric.column],
  //           10) === parseInt(filteredNumeric.value, 10)) return true;
  //         break;
  //       default:
  //         return false;
  //       }
  //       return false;
  //     });
  //   });
  // }

  function filteredNumbers(filteredByNames) {
    let filteredResult = filteredByNames;
    filteredResult.sort((a, b) => {
      const columnByOrder = filters.order.column;
      switch (filters.order.sort) {
      case 'ASC':
        if (parseFloat(a[columnByOrder]) > parseFloat(b[columnByOrder])) return one;
        if (parseFloat(a[columnByOrder]) < parseFloat(b[columnByOrder])) return minusOne;
        break;
      case 'DESC':
        if (parseFloat(a[columnByOrder]) > parseFloat(b[columnByOrder])) return minusOne;
        if (parseFloat(a[columnByOrder]) < parseFloat(b[columnByOrder])) return one;
        break;
      default: return zero;
      }
      return zero;
    });
    if (!filters.filterByNumericValues.length) {
      return setPlanetsFilters(filteredByNames);
    }
    filters.filterByNumericValues.forEach((filteredNumeric) => {
      filteredResult = filteredResult.filter((filtrado) => {
        switch (filteredNumeric.comparison) {
        case 'maior que':
          if (parseInt(filtrado[filteredNumeric.column],
            10) > parseInt(filteredNumeric.value, 10)) return true;
          break;
        case 'menor que':
          if (parseInt(filtrado[filteredNumeric.column],
            10) < parseInt(filteredNumeric.value, 10)) return true;
          break;
        case 'igual a':
          if (parseInt(filtrado[filteredNumeric.column],
            10) === parseInt(filteredNumeric.value, 10)) return true;
          break;
        default:
          return false;
        }
        return false;
      });
    });
    // auxiliaryFilters(filteredResult);
    setPlanetsFilters(filteredResult);
  }

  useEffect(() => {
    const filteredByNames = filteredName();
    filteredNumbers(filteredByNames);
  }, [filters]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const states = {
    planets,
    planetsFilters,
    filters,
    setFilters,
  };

  return (
    <Context.Provider value={ states }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
