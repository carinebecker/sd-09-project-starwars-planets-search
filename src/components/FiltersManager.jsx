import React, { useContext } from 'react';
import DataContextProvider from '../context/DataApiContext';

const FiltersManager = () => {
  const {
    filters, setFilters, columnDropdown, setColumnDropdown,
  } = useContext(DataContextProvider);
  const { filterByNumericValues } = filters;

  const handleClick = (column) => {
    const newFilters = filterByNumericValues
      .filter((eachFilter) => eachFilter.column !== column);
    setFilters({
      ...filters,
      filterByNumericValues: newFilters,
    });
    setColumnDropdown([
      ...columnDropdown,
      column,
    ]);
  };

  return (
    <div>
      { filterByNumericValues && filterByNumericValues
        .map(({ column, comparison, value }) => (
          <p data-testid="filter" key={ column }>
            {`${column} ${comparison} ${value}`}
            <button
              type="button"
              onClick={ () => handleClick(column) }
            >
              X
            </button>
          </p>
        )) }
    </div>
  );
};

export default FiltersManager;
