import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const NameFilter = () => {
  const { filters, getName } = useContext(StarWarsContext);

  const handleChange = ({ target: { value } }) => {
    getName(value);
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ filters.filterByName.name }
      onChange={ handleChange }
    />
  );
};

export default NameFilter;
