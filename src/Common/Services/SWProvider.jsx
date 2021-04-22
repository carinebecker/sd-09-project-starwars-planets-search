import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import * as SWApi from './starWarsAPI';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setNameFilter] = useState('');
  const [valueFilter, setValueFilter] = useState(0);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numericFilter, setNumericFilter] = useState(false);
  const [filterByNumericValues, setNewFilter] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const APIendpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchResults = async () => {
      const fetchedPlanets = await SWApi.fetchPlanets(APIendpoint);
      setPlanets(fetchedPlanets);
      setFilteredPlanets(fetchedPlanets);
    };
    fetchResults();
  }, []);

  useEffect(() => {
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(name)));
  }, [name, planets]);

  useEffect(() => {
    if (numericFilter) {
      filterByNumericValues.forEach((filter) => {
        if (filter.comparisonFilter === 'maior que') {
          setFilteredPlanets(filteredPlanets
            .filter((planet) => (
              parseFloat(planet[columnFilter]) > parseFloat(filter.valueFilter))));
        }
        if (filter.comparisonFilter === 'menor que') {
          setFilteredPlanets(filteredPlanets
            .filter((planet) => (
              parseFloat(planet[columnFilter]) < parseFloat(filter.valueFilter))));
        }
        if (filter.comparisonFilter === 'igual a') {
          setFilteredPlanets(filteredPlanets
            .filter((planet) => (
              planet[columnFilter] === filter.valueFilter)));
        }
      });
    }
  }, [numericFilter]);

  const SWContextObj = {
    planets,
    filteredPlanets,
    setPlanets,
    setNameFilter,
    setValueFilter,
    setColumnFilter,
    setComparisonFilter,
    setNumericFilter,
    setNewFilter,
    columnFilter,
    comparisonFilter,
    valueFilter,
    numericFilter,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    } };

  return (
    <main>
      <SWContext.Provider value={ SWContextObj }>
        { children }
      </SWContext.Provider>
    </main>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
