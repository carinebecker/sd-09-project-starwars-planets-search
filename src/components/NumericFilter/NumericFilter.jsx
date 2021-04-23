import React, { useContext } from 'react';
import FiltersContext from '../../context/FiltersContext';
import InputGroup from '../InputGroup/InputGroup';

export default function NumericFilter() {
  const {
    filters: { filterByNumericValues: numericFilters },
    setters: { removeNumericFilter },
  } = useContext(FiltersContext);

  return (
    <>
      {
        numericFilters.map(({ column, comparison, value }) => (
          <div key={ column + comparison + value } data-testid="filter">
            <p>
              {`${column} ${comparison} ${value}`}
            </p>
            <button type="button" onClick={ () => removeNumericFilter(column) }>X</button>
          </div>
        ))
      }
      <InputGroup />
    </>
  );
}
