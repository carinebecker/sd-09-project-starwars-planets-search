import React, { useContext } from 'react';
import AppContext from '../context/Context';

function FiltersCreated() {
  const {
    allFilters, setAllFilters,
    selectColumn, setSelectColumn,
  } = useContext(AppContext);
  const { filters: { filterByNumericValues } } = allFilters;

  const handleDeleteFilter = (event, filterSelected) => {
    event.preventDefault();

    selectColumn.forEach(({ option }, index) => {
      if (option === filterSelected) {
        selectColumn[index].enabled = true;
      }
    });
    setSelectColumn([...selectColumn]);

    filterByNumericValues.forEach(({ column }) => {
      let array = [];

      if (column === filterSelected) {
        array = filterByNumericValues
          .filter((filter) => filter.column !== filterSelected);
        setAllFilters({
          ...allFilters,
          filters: {
            ...allFilters.filters,
            filterByNumericValues: [
              ...array,
            ],
          },
        });
      }
    });
  };

  return (
    <div>
      {filterByNumericValues && filterByNumericValues
        .map(({ column, comparison, value }, index) => (
          <div key={ index } data-testid="filter">
            <span>{`${column} | ${comparison} | ${value}`}</span>
            <button
              type="button"
              onClick={ (event) => handleDeleteFilter(event, column) }
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
}

export default FiltersCreated;
