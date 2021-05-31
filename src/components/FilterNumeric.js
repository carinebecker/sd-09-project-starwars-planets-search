import React, { useContext, useState } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterNumeric() {
  const {
    setFilteredContent,
    filteredContent,
    comparisonValues,
    setComparisonValues,
    resetFilter,
  } = useContext(StarwarsContext);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [contextValue, setContextValue] = useState('');
  const columnComparisonValues = ['maior que', 'menor que', 'igual a'];

  // Referência: https://github.com/tryber/sd-09-project-starwars-planets-search/pull/121

  function submit() {
    setFilteredContent({
      ...filteredContent,
      filterByNumericValues: [
        ...filteredContent.filterByNumericValues,
        {
          column,
          comparison,
          value: contextValue,
        },
      ],
    });
    const unFilteredColumns = comparisonValues.filter((columns) => (
      columns !== column));
    setComparisonValues(unFilteredColumns);
  }

  const newFilter = (currentColumn) => {
    const result = filteredContent.filterByNumericValues
      .filter((filter) => filter.column !== currentColumn);
    resetFilter(result);
  };

  const revertFilterButton = () => (
    filteredContent.filterByNumericValues.map((filter) => (
      <p key={ filter.column } data-testid="filter">
        <button
          type="button"
          onClick={ () => newFilter(filter.column) }
        >
          X
        </button>
      </p>
    ))
  );

  return (
    <div>
      <label htmlFor="columnSearch">
        Choose a Column to search for:
        <select
          id="columnSearch"
          data-testid="column-filter"
          name="column"
          onChange={ (e) => setColumn(e.target.value) }
        >
          {comparisonValues.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
      <label htmlFor="columnComparison">
        <select
          id="columnComparison"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ (e) => setComparison(e.target.value) }
        >
          {columnComparisonValues.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="Digite o número para comparação"
        name="value"
        onChange={ (e) => setContextValue(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ submit }
      >
        Buscar
      </button>
      <div>
        {revertFilterButton()}
      </div>
    </div>
  );
}

export default FilterNumeric;
