import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Filter = () => {
  const { saveFilters } = useContext(StarWarsContext);
  return (

    <input
      type="text"
      placeholder="Filtrar por nome"
      data-testid="name-filter"
      onChange={ saveFilters }
    />
  );
};

export default Filter;
