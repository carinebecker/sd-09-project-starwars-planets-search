import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterByNumericValues() {
  const [filter, setFilter] = useState({});
  const { filters, setFilters,
    columnSelect, setColumnSelect } = useContext(PlanetsContext);

  const handleClick = () => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues,
        { ...filter }] });
    setColumnSelect(columnSelect
      .filter((item) => item !== filter.column));
  };
  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div>
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        {columnSelect.map((opt) => (<option key={ opt } value={ opt }>{opt}</option>))}
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ handleChange }>
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>
      <label htmlFor="value">
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ handleChange }
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </div>
  );
}
