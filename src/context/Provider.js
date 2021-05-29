import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import { fetchPlanets } from '../services/starWarsPlanetsAPI';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const contextValue = {
    data,
    setData,
    filteredData,
    setFilteredData,
    filters: { filterByName: name },
    setName,
    isFetching,
    setIsFetching,
  };

  // useEffect(() => {
  //   fetchPlanets().then((json) => setData(json)).then(() => setIsFetching(false));
  // }, []);

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
