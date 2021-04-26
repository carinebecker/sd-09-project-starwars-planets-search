import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

export default function Input() {
  const { filters, setFilter } = useContext(StarWarsContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilter({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          type="text"
          id="search"
          data-testid="name-filter"
          value={ filters.filterByName.name }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}
