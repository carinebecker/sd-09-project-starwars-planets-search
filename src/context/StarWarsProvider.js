import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/PlanetsAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  // usado para guardar a lista de planetas
  const [data, setData] = useState();

  // armazena os planetas filtrados pelo filtro customizado
  const [filteredPlanets, setFilteredPlanets] = useState();

  // initial state dos filtros
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  // gerencia o estado do filtro customizado
  const [customFilter, setCustomFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [optionsArray, setOptionsArray] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // const OPTIONS_ARRAY_INITIAL = [
  //   'population',
  //   'orbital_period',
  //   'diameter',
  //   'rotation_period',
  //   'surface_water',
  // ];

  const changeCustomFilter = (event) => {
    const { name, value } = event.target;
    setCustomFilter({
      ...customFilter,
      [name]: value,
    });
  };

  // usado para pegar a lista de planetas
  const getPlanetsData = async () => {
    const planetData = await fetchPlanets();
    setData(planetData);
    setFilteredPlanets(planetData);
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

  // enviar o customState para o estado principal
  const sendToState = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, { customFilter }],
    });
    console.log(customFilter);
  };

  // funcao para filtrar usando o filtro de valores numericos
  const filterPlanetsByNumericValue = ({ column, comparison, value }) => {
    const filteredPlanetList = data.filter((planet) => {
      const columnData = Number(planet[column]);
      const numberedValue = Number(value);
      if (comparison === 'maior que') {
        return columnData > numberedValue;
      }
      if (comparison === 'menor que') {
        return columnData < numberedValue;
      }
      return columnData === numberedValue;
    });
    setFilteredPlanets(filteredPlanetList);
    const newOptions = optionsArray.filter((option) => option !== column);
    setOptionsArray(newOptions);
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
    customFilter,
    changeCustomFilter,
    filteredPlanets,
    filterPlanetsByNumericValue,
    sendToState,
    optionsArray,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = { children: PropTypes.node.isRequired };

export default StarWarsProvider;
