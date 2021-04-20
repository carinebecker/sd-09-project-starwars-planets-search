import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import requestAPI from '../service/request';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  async function getPlanets() {
    const response = await requestAPI();
    const results = response.results.map((r) => {
      delete r.residents;
      return r;
    });
    setPlanets(results);
  }

  return (
    <main>
      <MyContext.Provider value={ { planets, getPlanets } }>
        { children }
      </MyContext.Provider>
    </main>
  );
}

MyProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export default MyProvider;
