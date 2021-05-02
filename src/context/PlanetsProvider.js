import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import fetchPlanetApi from '../services/PlanetsApi';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState({});

  const getData = async () => setData(await fetchPlanetApi());

  useEffect(() => { getData(); }, []);

  const value = { data };

  return (
    <div>
      <PlanetsContext.Provider value={ value }>
        {children}
      </PlanetsContext.Provider>
    </div>
  );
}

PlanetsProvider.propTypes = { children: node }.isRequired;

export default PlanetsProvider;
