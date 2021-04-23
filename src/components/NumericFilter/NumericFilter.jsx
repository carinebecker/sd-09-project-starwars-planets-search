import React from 'react';
import InputGroup from '../InputGroup/InputGroup';

export default function NumericFilter() {
  return (
    <>
      <InputGroup />
      <button
        type="button"
        data-testid="button-filter"
        // onClick={ addFilters }
      >
        Filtrar
      </button>
    </>
  );
}
