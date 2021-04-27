import React, { useContext, useEffect, useState } from 'react';

import StarWars from '../context/StarWarsContext';
import './css/Filter.css';

const FilterByName = () => {
  const [name, setName] = useState('');
  const { filters, setFilters } = useContext(StarWars);

  useEffect(() => {
    setFilters({
      filters: {
        ...filters.filters,
        filterByName: {
          name,
        },
      },
    });
  }, [name]);

  const handleChanges = ({ target }) => {
    setName(target.value);
  };

  return (
    <input
      className="inputName"
      type="text"
      id="name-filter"
      data-testid="name-filter"
      name="name-filter"
      value={ name }
      onChange={ handleChanges }
      placeholder="Name:"
    />
  );
};

export default FilterByName;
