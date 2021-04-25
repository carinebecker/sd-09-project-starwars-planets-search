import React, { useContext, useState } from 'react';
import { useFilters } from '../../hooks';
import FiltersContext from '../../context/FiltersContext';
import Dropdown from '../Dropdown';

export default function SortingTool() {
  const { allFilters } = useFilters();

  const { filters: { order }, setters: { setOrder } } = useContext(FiltersContext);

  const [sortingDescription, setSortingDescription] = useState(order);

  function updateSortingInfo(e) {
    const { value, name } = e.target;
    setSortingDescription({ ...sortingDescription, [name]: value });
  }

  return (
    <div>
      <Dropdown
        options={ allFilters }
        dataTestID="column-sort"
        value={ sortingDescription.column }
        name="column"
        onHandleChange={ updateSortingInfo }
      />
      <label htmlFor="asc-radio">
        Ascendente
        <input
          type="radio"
          name="sort"
          id="asc-radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ sortingDescription.sort === 'ASC' }
          onChange={ updateSortingInfo }
        />
      </label>
      <label htmlFor="desc-radio">
        Descendente
        <input
          type="radio"
          name="sort"
          id="desc-radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ sortingDescription.sort === 'DESC' }
          onChange={ updateSortingInfo }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setOrder(sortingDescription) }
      >
        Ordenar
      </button>
    </div>
  );
}
