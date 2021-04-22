import React, { useContext } from 'react';
import SWContext from '../Services/SWContext';

function SearchInput() {
  const { setNameFilter,
    setColumnFilter,
    setValueFilter,
    setComparisonFilter,
    setNumericFilter,
    setNewFilter,
    columnFilter,
    valueFilter,
    comparisonFilter,
    filters } = useContext(SWContext);

  const handleChange = ({ target }) => {
    setNameFilter(target.value);
  };

  const handleNumChange = ({ target }) => {
    switch (target.name) {
    case 'column-filter':
      return setColumnFilter(target.value);
    case 'comparison-filter':
      return setComparisonFilter(target.value);
    case 'value-filter':
      return setValueFilter(target.value);
    default: break;
    }
  };

  const handleClick = () => {
    setNumericFilter(true);
    const filter = {
      columnFilter,
      valueFilter,
      comparisonFilter,
    };
    setNewFilter((previousFilters) => ([
      ...previousFilters,
      filter,
    ]
    ));
  };

  const renderFilterSelects = () => {
    const { filterByNumericValues } = filters;

    const selectOptions = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    const usedFilters = filterByNumericValues.map((item) => item.columnFilter);
    if (usedFilters.length === 0) {
      return selectOptions.map((item) => <option key={ item }>{ item }</option>);
    } return selectOptions
      .map((option) => !usedFilters.includes(option)
        && <option key={ option }>{ option }</option>);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
        placeholder="insert a name"
      />
      <div>
        <select
          data-testid="column-filter"
          onChange={ handleNumChange }
          name="column-filter"
        >
          { renderFilterSelects() }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleNumChange }
          name="comparison-filter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          onChange={ handleNumChange }
          placeholder="insert a value"
          name="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Busca
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
