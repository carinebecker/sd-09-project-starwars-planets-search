import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setPlanets] = useState([]);

  return (
    <main>
      <MyContext.Provider value={ { data, setPlanets } }>
        { children }
      </MyContext.Provider>
    </main>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export default MyProvider;
