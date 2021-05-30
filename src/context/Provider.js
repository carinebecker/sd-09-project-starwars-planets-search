import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import { fetchPlanets } from '../services/starWarsPlanetsAPI';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const contextValue = {
    data,
    setData,
    filteredData,
    setFilteredData,
    filters: {
      filterByName: name,
      filterByNumericValues: number,
    },
    setName,
    setNumber,
    isFetching,
    setIsFetching,
  };

  // function filterData() {
  //   console.log('Passo1');
  //   const planets = data;
  //   const filters = number;
  //   for (let index = 0; index < filters.lenght; index += 1) {
  //     console.log('Passo2 - ', index);
  //     if (filters[index].comparison === 'maior que') {
  //       setFilteredData(planets
  //         .filter((item) => item[filters[index].column] > filters[index].value));
  //     }
  //     if (filters[index].comparison === 'menor que') {
  //       setFilteredData(planets
  //         .filter((item) => item[filters[index].column] < filters[index].value));
  //     }
  //     if (filters[index].comparison === 'igual a') {
  //       setFilteredData(planets
  //         .filter((item) => item[filters[index].column] === filters[index].value));
  //     }
  //   }
  // }

  // useEffect(() => {
  //   filterData();
  // }, [number]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
