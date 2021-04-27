import React, { useContext } from 'react';
import { SwPlanetsContext } from '../context/SWPlanetsContext';

function Form() {
  const {
    filters: { filterByName: { name } },
    filter: { value },
    columns,
    comparisons,
    headers,
    handleNameChange,
    handleFilterClick,
    handleValueChange,
    handleRemoveClick,
    handleSortChange,
    handleSortClick,
  } = useContext(SwPlanetsContext);

  return (
    <div>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          value={ name }
          onChange={ handleNameChange }
          placeholder="Planet Name"
        />
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handleValueChange }
        >
          { columns.map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleValueChange }
        >
          { comparisons.map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ value }
          onChange={ handleValueChange }
          placeholder="Value Filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
        >
          Filter
        </button>
        <select
          name="column"
          data-testid="column-sort"
          onChange={ handleSortChange }
        >
          { headers.map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
        <label htmlFor="ASC">
          ASC
          <input
            type="radio"
            id="ASC"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleSortChange }
          />
        </label>
        <label htmlFor="DESC">
          DESC
          <input
            type="radio"
            id="DESC"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleSortChange }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSortClick }
        >
          Sort
        </button>
      </form>
      <div data-testid="filter">
        <button type="button" onClick={ handleRemoveClick }>X</button>
      </div>
    </div>
  );
}

export default Form;
