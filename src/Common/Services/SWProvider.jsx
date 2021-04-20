import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import * as SWApi from './starWarsAPI';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const APIendpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchResults = async () => {
      const fetchedPlanets = await SWApi.fetchPlanets(APIendpoint);
      // console.log(fetchedPlanets);
      setPlanets(fetchedPlanets);
    };
    fetchResults();
  }, []);

  const SWContextObj = { planets };

  return (
    <main>
      <SWContext.Provider value={ SWContextObj }>
        { children }
      </SWContext.Provider>
    </main>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
