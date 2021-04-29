import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext();

const TableContextProvider = (props) => {
  const { children } = props;

  const [planets, setPlanets] = useState([]);

  const [nameFilters, setNameFilters] = useState('');

  const [planetDetails, setPlanetDetails] = useState('population');

  const [planetComparison, setPlanetComparison] = useState('maior que');

  const [planetPopulation, setPlanetPopulation] = useState('');

  const [filters, setFilters] = useState([]);

  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchApi = async () => {
    const { results } = await fetch(url)
      .then((response) => response.json());
    setPlanets(results);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const filterPlanet = ({ target }) => {
    const { value } = target;
    setNameFilters(value);
  };

  const filterPlanetDetails = ({ target }) => {
    const { value } = target;
    setPlanetDetails(value);
  };

  const filterPlanetComparison = ({ target }) => {
    const { value } = target;
    setPlanetComparison(value);
  };

  const filterPlanetPopulation = ({ target }) => {
    const { value } = target;
    setPlanetPopulation(value);
  };

  const controlFilters = () => {
    setFilters([...filters,
      {
        column: planetDetails,
        comparison: planetComparison,
        value: planetPopulation,
      },
    ]);
  };

  const contextValue = {
    data: planets,
    filters: {
      filterByName: {
        name: nameFilters,
      },
      filterByNumericValues: [
        ...filters,
      ],
    },
    planetDetails,
    planetComparison,
    planetPopulation,
    filterPlanet,
    filterPlanetDetails,
    filterPlanetComparison,
    filterPlanetPopulation,
    controlFilters,
  };

  return (
    <TableContext.Provider value={ contextValue }>
      { children }
    </TableContext.Provider>
  );
};

export default TableContextProvider;

TableContextProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
