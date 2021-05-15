import React, { useContext } from 'react';
import DataApiContext from '../context/DataApiContext';

const FilterByName = () => {
  const { filters, setFilters } = useContext(DataApiContext);

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  return (
    <div>
      <h3>Busca:</h3>
      <label
        htmlFor="name-filter"
      >
        Digite um nome:
        <input
          type="text"
          name="name"
          id="name-filter"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
};

export default FilterByName;
