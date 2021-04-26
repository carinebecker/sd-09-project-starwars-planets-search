import React, { useContext } from 'react';
import { MyContext } from '../MyContext';

const TableFiltered = () => {
  const {
    serchInput,
    setOptionsFilter,
    filterByNumber,
    column,
    comparison,
    columnFilter,
  } = useContext(MyContext);

  const valueFilter = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ serchInput }
        placeholder="Search planet"
      />
      <select
        value={ column }
        data-testid="column-filter"
        name="columnFilter"
        onChange={ setOptionsFilter }
      >
        {columnFilter.map((opt) => (
          <option key={ opt }>{opt}</option>
        ))}
      </select>
      <select
        value={ comparison }
        name="comparisonFilter"
        data-testid="comparison-filter"
        onChange={ setOptionsFilter }
      >
        {valueFilter.map((val) => (
          <option key={ val }>{val}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Number"
        data-testid="value-filter"
        name="valueFilter"
        onChange={ setOptionsFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterByNumber }
      >
        Filtrar
      </button>
    </div>
  );
};

export default TableFiltered;
