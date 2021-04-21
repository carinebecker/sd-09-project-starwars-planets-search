import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import * as SWApi from './starWarsAPI';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  // const [name, setNameFilter] = useState('');
  // const [name, setNameFilter] = useState('');

  useEffect(() => {
    const APIendpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchResults = async () => {
      const fetchedPlanets = await SWApi.fetchPlanets(APIendpoint);
      setPlanets(fetchedPlanets);
      setFilteredPlanets(fetchedPlanets);
    };
    fetchResults();
  }, []);

  useEffect(() => {
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(name)));
  }, [name, planets]);

  const SWContextObj = {
    planets,
    filteredPlanets,
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
