import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import MyContext from './MyContext';

const Provider = ({ children }) => {
  const [data, setPlanets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [options, setOptions] = useState({
    subject: 'population',
    name: '',
    operator: 'maior que',
    number: '',
  });

  const getData = async () => {
    const planets = await fetchAPI();
    setPlanets(planets);
    setFilteredData(planets);
  };

  const filterOptions = (e) => {
    const { name, value } = e.target;
    if (name === 'subject') {
      setOptions({ ...options, subject: value });
    } else if (name === 'operator') {
      setOptions({ ...options, operator: value });
    } else {
      setOptions({ ...options, number: value });
    }
  };

  const filterByNumber = () => {
    const { subject, operator, number } = options;
    const newFiltered = filteredData.filter(
      (planet) => {
        if (operator === 'maior que') {
          return (parseInt(planet[subject], 10) > parseInt(number, 10));
        }
        if (operator === 'menor que') {
          return (parseInt(planet[subject], 10) < parseInt(number, 10));
        }
        if (operator === 'igual a') {
          return (parseInt(planet[subject], 10) === parseInt(number, 10));
        }
        return filteredData;
      },
    );
    setFilteredData(newFiltered);
  };

  const filterPlanets = (e) => {
    const filterName = e.target.value;
    setOptions({ ...options, name: filterName });
    const filtered = data.filter((planet) => planet.name.includes(filterName));
    setFilteredData(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  const context = {
    data,
    filteredData,
    filterPlanets,
    filterByNumber,
    filterOptions,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
