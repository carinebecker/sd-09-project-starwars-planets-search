import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanets from './getPlanets';

export const savePlanets = createContext();

function ContextPlanets({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function myPlanets() {
      const planetList = await getPlanets();
      setPlanets(planetList);
    }
    myPlanets();
  }, []);

  const data = { planets };
  return (
    <savePlanets.Provider value={ data }>
      { children }
    </savePlanets.Provider>
  );
}

ContextPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextPlanets;
