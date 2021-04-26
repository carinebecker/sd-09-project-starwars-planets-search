import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filter() {
  const { setPlanetFilteredByName } = useContext(TableContext);

  const searchByPlanet = ({ target }) => {
    const { value } = target;
    setPlanetFilteredByName({ filters: { filterByName: { name: value } } });
  };

  return (
    <input type="text" data-testid="name-filter" onChange={ searchByPlanet } />
  );
}

export default Filter;
