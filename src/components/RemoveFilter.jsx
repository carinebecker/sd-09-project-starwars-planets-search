import React, { useContext } from 'react';
import StateContext from '../context/stateContext';

const RemoveFilter = () => {
  const { filters: { filterByNumericValues },
    setFiltersByNumericValues } = useContext(StateContext);

  return (
    <div>
      { filterByNumericValues.map(({ column, comparison, value }) => (
        <div key={ value } data-testid="filter">
          <div>
            {`${column} ${comparison} ${value}`}
          </div>
          <button
            type="button"
            onClick={ () => {
              setFiltersByNumericValues(filterByNumericValues
                .filter((filter) => filter.column !== column));
            } }
          >
            x
          </button>
        </div>
      ))}
    </div>);
};

export default RemoveFilter;
