import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SWContext from '../StarWarsContext';
import services from '../services';

function Provider({ children }) {
  const [data, setData] = useState({});
  const [planetsToFilter, setPlanetsToFilter] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataFromApi = await services.fetchData();
      setData(dataFromApi);
      setPlanetsToFilter(dataFromApi.results);
    }
    getData();
  }, []);

  const contextValue = { data, planetsToFilter };

  return (
    <SWContext.Provider value={ contextValue }>
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
