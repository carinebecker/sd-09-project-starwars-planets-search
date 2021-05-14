import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StarwarsContext from './StarwarsContext';
import getPlanets from '../services/planetListAPI';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filterTypes, setFilterTypes] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: '100000',
        }
      ]
    },
  });
  const [filteredByName, setFilteredByName] = useState([]);

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
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByNameText = (value) => {
    const filtered = planets.filter(({ name }) => (
      name.toLowerCase().includes(value.toLowerCase())
    ));
    setFilteredByName(filtered);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      // console.log(`name:${name}, value:${value}`);
      setFilterTypes((prevState) => ({
        ...prevState,
        filters: {
          filterByName: {
            name: value,
          },
        },
      }));
    } else {
      // console.log(`name:${name}, value:${value}`);
      setFilterTypes({
        ...filterTypes,
        filterByNumericValues: {
          [name]: value,
        }
      });
    }
    if (name === 'name') filterByNameText(value);
  };
  /* const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      // console.log(`name:${name}, value:${value}`);
      setFilterTypes({
        ...filterTypes,
        filterByName: {
          [name]: value,
        }
      });
    } else {
      // console.log(`name:${name}, value:${value}`);
      setFilterTypes({
        ...filterTypes,
        filterByNumericValues: {
          [name]: value,
        }
      });
    }
    if (name === 'name') filterByNameText(value);
  }; */

  console.log(filterTypes);

  const handleClickBtn = ({ target }) => {

  }

  const context = {
    planets,
    isFetching,
    tableHeaders,
    filterTypes,
    filteredByName,
    fetchPlanets,
    handleChange,
  };

  return (
    <StarwarsContext.Provider value={ context }>
      { children }
    </StarwarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
