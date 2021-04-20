import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filters, setFilters } = useContext(StarWarsContext);

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  return (
    <section>
      <label htmlFor="name-filter">
        Search by name:
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          id="name-filter"
          onChange={ handleChange }
        />
      </label>
    </section>
  );
}

export default Filters;
