import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import SortColumns from './SortColumns';

const initialState = {
  column: 'rotation_period',
  comparison: 'maior que',
  value: '',
};

function Filters() {
  const { filters, setFilters, columns, setColumns } = useContext(StarWarsContext);
  const [selectedFilters, setSelectedFilters] = useState(initialState);

  const handleNameChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };

  const removeFilter = (column) => {
    const { filterByNumericValues } = filters;
    setColumns([...columns, column]);
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((item) => (
        item.column !== column
      )),
    });
  };

  const handleClick = () => {
    const { filterByNumericValues } = filters;
    const { column } = selectedFilters;
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, selectedFilters],
    });
    setColumns(columns.filter((item) => item !== column));
    setSelectedFilters(initialState);
  };

  const renderSearchBar = () => (
    <div>
      <label htmlFor="name-filter">
        Search by name:
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          id="name-filter"
          onChange={ handleNameChange }
        />
      </label>
    </div>
  );

  const renderColumnOptions = () => {
    const { column } = selectedFilters;
    return (
      <div>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handleChange }
          value={ column }
        >
          {
            columns.map((item) => (
              <option key={ item }>{ item }</option>
            ))
          }
        </select>
      </div>
    );
  };

  const renderComparisonOptions = () => {
    const { comparison } = selectedFilters;
    const comparisonOptions = ['maior que', 'menor que', 'igual a'];
    return (
      <div>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ comparison }
        >
          {
            comparisonOptions.map((item) => (
              <option key={ item }>{ item }</option>
            ))
          }
        </select>
      </div>
    );
  };

  const renderValueInputOption = () => {
    const { value } = selectedFilters;
    return (
      <div>
        <label htmlFor="value-filter">
          <input
            type="number"
            name="value"
            data-testid="value-filter"
            id="value-filter"
            onChange={ handleChange }
            value={ value }
          />
        </label>
      </div>
    );
  };

  const renderFiltersOptions = () => {
    const { filterByNumericValues } = filters;
    return (
      <div>
        {
          filterByNumericValues.map((item) => {
            const { column, comparison, value } = item;
            if (column === '') return;
            return (
              <div key={ column } data-testid="filter">
                <span>{ `${column} ${comparison} ${value}` }</span>
                <button
                  type="button"
                  onClick={ () => removeFilter(column) }
                >
                  X
                </button>
              </div>
            );
          })
        }
      </div>
    );
  };

  return (
    <section>
      { renderSearchBar() }
      <div>
        { renderColumnOptions() }
        { renderComparisonOptions() }
        { renderValueInputOption() }
      </div>
      <div>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
      { renderFiltersOptions() }
      <SortColumns />
    </section>
  );
}

export default Filters;
