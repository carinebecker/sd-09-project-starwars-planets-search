import React, { useState, useContext } from 'react';
import DataApiContext from '../context/DataApiContext';

const FilterByNumbers = () => {
  const [inputFilterByNumericValues, setInputFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const { filters, setFilters, columnDropdown, setColumnDropdown } = useContext(DataApiContext);

  const handleChange = ({ target: { name, value } }) => {
    setInputFilterByNumericValues({
      ...inputFilterByNumericValues,
      [name]: value,
    });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        inputFilterByNumericValues,
      ],
    });
    const filterValues = Object.values(inputFilterByNumericValues)[0];
    const newColumn = columnDropdown.filter((eachColumn) => (
      eachColumn !== filterValues
    ));
    setColumnDropdown(newColumn);
  };

  const renderColumnDropdown = () => (
    <select
      data-testid="column-filter"
      name="column"
      onChange={ handleChange }
    >
      <option>---</option>
      { columnDropdown.map((eachColumn) => (
        <option key={ eachColumn } value={ eachColumn }>{ eachColumn }</option>
      ))}
      ;
    </select>
  );

  return (
    <div>
      { renderColumnDropdown() }
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
      >
        <option
          value="maior que"
        >
          maior que
        </option>
        <option
          value="menor que"
        >
          menor que
        </option>
        <option
          value="igual a"
        >
          igual a
        </option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Aplicar filtro
      </button>
    </div>
  );
};

export default FilterByNumbers;
