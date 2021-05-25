import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import getPlanets from '../services/planetListAPI';

const Provider = ({ children }) => {
  // state principal
  const [filterTypes, setFilterTypes] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'Name',
        sort: 'ASC',
      },
    },
  });
  // planetas fornecidos pela API
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  // state com o array filtrado
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    filterByNameText();
    // filterPlanets();
  }, [filterTypes]);

  const removeResidentsKey = (planetsArray) => {
    planetsArray.forEach((planet) => {
      delete planet.residents;
    });
  };

  const filterTableHeads = (planetsHeaders) => {
    const headers = Object.keys(planetsHeaders[0]);
    setTableHeaders(headers);
  };

  const fetchPlanets = async () => {
    setIsFetching(true);
    try {
      const response = await getPlanets();
      removeResidentsKey(response);
      filterTableHeads(response);
      setPlanets(response);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByNameText = () => {
    const { filters: { filterByName: { name: value } } } = filterTypes;
    const filtered = planets.filter(({ name }) => (
      name.toLowerCase().includes(value.toLowerCase())
    ));
    setFilteredPlanets(filtered);
  };

  const filterNumericValues = (array, filterRule) => {
    console.log("filterRule");
    console.log(filterRule);
    const { column, comparison, value } = filterRule;
    const result = array.filter((planet) => {
      switch (comparison) {
        case 'maior que':
          return planet[column] > value;
        case 'menor que':
          return planet[column] < value;
        case 'igual a':
          return planet[column] === value;
        default:
          return planet;
      }
    });
    return result;
  }

  const filterPlanets = () => {
    // const { filterByName: { name }, filterByNumericValues } = filters;

    // /* console.log(filterByName);
    // console.log(filterByNumericValues); */
    // // 1 - iniciar o array de filtro com todos os planetas
    // let filterResult = [...planets];
    // console.log('array inicial');
    // console.log(filterResult);

    // /* 2 - iniciar a filtragem pelos valores numericos. comecando pelo primeiro
    // filtro do primeiro indice ate o ultimo, retornar um array com o filtro geral
    // dos filtros numericos. */
    // if (filterByNumericValues.length > 0) {
    //   filterByNumericValues.forEach((filterRule) => {
    //     filterResult = filterNumericValues(filterResult, filterRule);
    //   });
    // }
    // console.log('array com filtro numerico');
    // console.log(filterResult);

    // /* 3 - Apos realizar os filtros numericos pegar o resultado e filtrar pelo nome
    // buscado. */
    // if (name.length > 0) {
    //   filterResult = filterByNameText(filterResult, name);
    // }
    // console.log('array filtrado pelo nome');
    // console.log(filterResult);

    // // 4 - Terminado todos os filtros setar o resultado no estado para ser usado
    // setfilteredPlanets(filterResult);
  }
  
  // console.log(filter);

  // let filterResult = planets;
  // console.log(filteredPlanets);

  const context = {
    planets,
    isFetching,
    tableHeaders,
    filterTypes,
    fetchPlanets,
    filteredPlanets,
    setFilterTypes,
    filterPlanets,
  };

  return (
    <StarwarsContext.Provider value={context}>
      { children}
    </StarwarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

  /* const filterTypes = {
    filters: {
      filterByName,
      filterByNumericValues,
    }
  } */

  /* const filterNumericValues = () => {
    const { filters: { filterByNumericValues } } = filterTypes;
    const { column, comparison, value } = filterByNumericValues;
    const result = planets.filter((planet) => {
      switch (comparison) {
        case 'maior que':
          return planet[column] > value;
        case 'menor que':
          return planet[column] < value;
        case 'igual a':
          return planet[column] === value;
        default:
          return planet;
      }
    });
    return result;
  }

  const filterPlanets = () => {
    const { filters: { filterByName, filterByNumericValues} } = filterTypes;

    console.log(filterByName);
    console.log(filterByNumericValues);

    if (filterByName.name.length === 0 && filterByNumericValues.length === 0) {
      console.log('Sem filtro');
      // return planets;
      setFiltered(planets);
    } else if (filterByName.name.length > 0 && filterByNumericValues.length === 0) {
      filterByNameText(planets, filterByName.name);
      console.log('filtro texto')
      console.log(filteredByName)
      // return filteredByName;
      setFiltered(filteredByName);
    } else if (filterByName.name.length === 0 && filterByNumericValues.length > 0) {
      const result = filterNumericValues();
      console.log('filtro numerico')
      console.log(result);
      // return result;
      setFiltered(result);
    } else {
      const numericFilter = filterNumericValues();
      filterByNameText(numericFilter, filterByName.name);
      console.log('filtro numerico e texto');
      console.log(numericFilter)
      console.log(filteredByName)
      // return filteredByName;
      setFiltered(filteredByName);
    }
  } */


