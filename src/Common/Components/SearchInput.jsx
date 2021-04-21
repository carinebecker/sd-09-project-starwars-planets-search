import React, { useContext } from 'react';
import SWContext from '../Services/SWContext';

function SearchInput() {
  const { setNameFilter } = useContext(SWContext);

  const handleChange = ({ target }) => {
    setNameFilter(target.value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </div>
  );
}

export default SearchInput;
