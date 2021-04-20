import React from 'react';
import fetchApiPlanets from '../services/fetchPlanet';

const Table = () => {
  const planets = fetchApiPlanets();
  console.log(planets);
  return (
    <div>Heloo Planet</div>
  );
};
export default Table;
