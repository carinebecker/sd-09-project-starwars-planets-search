import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './StarwarsContext';
import fetchApiPlanets from '../services/fetchPlanet';

function Provider({ children }) {
  const filter = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name', sort: 'ASC',
    },
  };
  const compareValues = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [data, setData] = useState({});
  const [comparisonValues, setComparisonValues] = useState(compareValues);
  const [filteredContent, setFilteredContent] = useState(filter);

  async function getPlanets() {
    const apiResponse = await fetchApiPlanets();
    setData(apiResponse);
  }
  // Referência: https://github.com/tryber/sd-09-project-starwars-planets-search/pull/121
  function setOrder(tableData, column, sort) {
    let orderedData = tableData;
    const magicNumber = -1;
    if (column === 'name') {
      orderedData = tableData.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1;
        }
        return magicNumber;
      });
    } else {
      orderedData = tableData.sort((a, b) => +(a[column]) - +(b[column]));
    }
    if (sort === 'DESC') {
      orderedData = orderedData.reverse();
    }
    return orderedData;
  }

  // Referência: https://github.com/tryber/sd-09-project-starwars-planets-search/pull/121
  const resetFilter = (newFilter) => {
    setFilteredContent({ ...filteredContent, filterByNumericValues: newFilter });
    setComparisonValues(compareValues);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    data,
    setOrder,
    resetFilter,
    compareValues,
    filteredContent,
    setComparisonValues,
    setFilteredContent,
    comparisonValues,
  };
  return (
    <StarwarsContext.Provider value={ contextValue }>
      {children}
    </StarwarsContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
