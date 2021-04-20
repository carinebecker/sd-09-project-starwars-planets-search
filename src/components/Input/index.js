import React, { useContext } from 'react';
import starsWContext from '../../context/starsWContext';

export default function Input() {
  const { filters, setFilter } = useContext(starsWContext);

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
  );
}
