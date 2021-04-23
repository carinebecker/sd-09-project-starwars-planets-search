import React, { useContext } from 'react';
import FiltersContext from '../../context/FiltersContext';
import InputGroup from '../InputGroup/InputGroup';

export default function NumericFilter() {
  const {
    filters: { filterByNumericValues: numericFilters },
  } = useContext(FiltersContext);

  return (
    <>
      {
        numericFilters.map(({ column, comparison, value }) => (
          <p key={ column + comparison + value }>
            {`${column} ${comparison} ${value}`}
          </p>))
      }
      <InputGroup />
    </>
  );
}
