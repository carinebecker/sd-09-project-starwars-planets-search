import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/PlanetsAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  // usado para guardar a lista de planetas
  const [data, setData] = useState();

  // initial state dos filtros
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  // usado para pegar a lista de planetas
  const getPlanetsData = async () => {
    const planetData = await fetchPlanets();
    setData(planetData);
  };

  // filter by name
  const filterByName = (event) => {
    const { value } = event.target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  // guarda a lista de planetas assim que o componente é iniciado
  useEffect(() => {
    getPlanetsData();
  }, []);

  const context = {
    data,
    setData,
    filters,
    filterByName,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = { children: PropTypes.node.isRequired };

export default StarWarsProvider;
