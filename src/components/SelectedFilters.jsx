import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const SelectedFilters = () => {
  const { filterByNum, setFilterByNum } = useContext(MyContext);

  function removeFilter(filtered) {
    setFilterByNum(filterByNum.filter((filter) => filter !== filtered));
  }

  const renderSelectedFilters = () => (
    <fieldset>
      <legend>Current Filters</legend>
      <ul>
        {
          filterByNum.map((filter, index) => (
            <li
              data-testid="filter"
              key={ index }
            >
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                type="button"
                onClick={ () => removeFilter(filter) }
              >
                X
              </button>
            </li>
          ))
        }
      </ul>
    </fieldset>
  );
  return (
    renderSelectedFilters()
  );
};

export default SelectedFilters;
