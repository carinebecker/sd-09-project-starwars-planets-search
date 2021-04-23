import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { search, setSearch } = useContext(MyContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch({
      ...search,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <section>
      <label htmlFor="name-filter">
        Search Planet
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
    </section>
  );
}

export default Filters;
