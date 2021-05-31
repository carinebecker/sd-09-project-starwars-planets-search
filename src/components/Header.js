// Header

import React, { useContext } from 'react';
import Context from '../context/Context';

function Header() {
  const {
    filters,
    setFilters,
  } = useContext(Context);

  return (
    <div>
      <ul>
        {filters.filterByNumericValues.map(({ column, comparison, value }) => (
          <li data-testid="filter" key={ column }>
            Column:
            { column }
            , comparison:
            { comparison }
            , value:
            { value }
            <button
              type="button"
              onClick={ () => setFilters({
                ...filters,
                filterByNumericValues: [...filters.filterByNumericValues
                  .filter((filter) => filter.column !== column)],
              }) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
