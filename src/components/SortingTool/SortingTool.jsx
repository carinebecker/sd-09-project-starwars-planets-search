import React, { useContext, useState } from 'react';
import { useFilters } from '../../hooks';
import FiltersContext from '../../context/FiltersContext';
import Dropdown from '../Dropdown';

export default function SortingTool() {
  const { allFilters } = useFilters();

  const { filters: { order }, setters: { setOrder } } = useContext(FiltersContext);

  const [sortingDescription, setSortingDescription] = useState(order);

  function changeColumn(e) {
    const { value, name } = e.target;
    setSortingDescription({ ...sortingDescription, [name]: value });
    setOrder({ ...sortingDescription, [name]: value });
  }

  function switchSortingOrder(e) {
    const { value } = e.target;
    setSortingDescription({ ...sortingDescription, sort: value });
    setOrder({ ...sortingDescription, sort: value });
  }

  return (
    <div>
      <Dropdown
        options={ allFilters }
        dataTestID="column-sort"
        value={ sortingDescription.column }
        name="column"
        onHandleChange={ changeColumn }
      />
      <label htmlFor="asc-radio">
        Ascendente
        <input
          type="radio"
          name="column-sorting"
          id="asc-radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ sortingDescription.sort === 'ASC' }
          onChange={ switchSortingOrder }
        />
      </label>
      <label htmlFor="desc-radio">
        Descendente
        <input
          type="radio"
          name="column-sorting"
          id="desc-radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ sortingDescription.sort === 'DESC' }
          onChange={ switchSortingOrder }
        />
      </label>
    </div>
  );
}
