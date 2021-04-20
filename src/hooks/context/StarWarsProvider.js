import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';

import StarWarsContext from './StarWarsContext';
import getPlanets from '../../services/starWarsAPI';

const StarWarsProvider = (({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPlanets().then((planets) => {
      setData(planets);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <StarWarsContext.Provider value={ data }>
      { children }
    </StarWarsContext.Provider>
  );
});

StarWarsProvider.propTypes = {
  children: node.isRequired,
};

export default StarWarsProvider;
