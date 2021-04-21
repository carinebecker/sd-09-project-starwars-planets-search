import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import * as SWApi from './starWarsAPI';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setNameFilter] = useState('');
  // const [name, setNameFilter] = useState('');
  // const [name, setNameFilter] = useState('');

  useEffect(() => {
    const APIendpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchResults = async () => {
      const fetchedPlanets = await SWApi.fetchPlanets(APIendpoint);
      if (name === '') {
        setPlanets(fetchedPlanets);
      } else {
        setPlanets(fetchedPlanets.filter((planet) => planet.name.includes(name)));
      }
    };
    fetchResults();
  }, [name]);

  const SWContextObj = {
    planets,
    setPlanets,
    setNameFilter,
    filters: {
      filterByName: {
        name,
      },
    } };

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
