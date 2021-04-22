import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanets from '../services/starwarsApi';

function PlanetProvider({ children }) {
  const baseFilter = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [{
      column: '', value: '', comparison: '',
    }],
  };
  const [data, setData] = useState([]);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(baseFilter);
  const [numericValuesFilterOn, setNumericValuesFilter] = useState(false);

  const context = {
    dataToFilter,
    setDataToFilter,
    loading,
    filters,
    setFilters,
    setNumericValuesFilter,
  };

  const getData = async () => {
    const { results } = await getPlanets();
    setData(results);
    setDataToFilter(results);
    setLoading(false);
  };

  useEffect(() => {
    const { filterByName: { name } } = filters;
    let planetsToBeFiltered = data;
    planetsToBeFiltered = planetsToBeFiltered.filter(
      (planet) => planet.name.toUpperCase().includes(name.toUpperCase()),
    );
    setDataToFilter(planetsToBeFiltered);
  },
  [data, filters]);

  useEffect(() => {
    if (numericValuesFilterOn) {
      const { filterByNumericValues: [{ column, comparison, value }] } = filters;
      let planetsToBeFiltered = data;
      const valueNumber = parseInt(value, 10);
      if (comparison === 'maior que') {
        planetsToBeFiltered = planetsToBeFiltered.filter(
          (planet) => planet[column] > valueNumber,
        );
      }
      if (comparison === 'menor que') {
        planetsToBeFiltered = planetsToBeFiltered.filter(
          (planet) => planet[column] < valueNumber,
        );
      }
      if (comparison === 'igual a') {
        planetsToBeFiltered = planetsToBeFiltered.filter(
          (planet) => planet[column] === value,
        );
      }
      setDataToFilter(planetsToBeFiltered);
    }
  }, [data, filters, numericValuesFilterOn]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <PlanetContext.Provider value={ context }>
        {children}
      </PlanetContext.Provider>
    </main>

  );
}
PlanetProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.element),
}.isRequired;
export default PlanetProvider;
