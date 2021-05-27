import React, { useContext, useState } from 'react';
import planetsContext from '../Context/planetsContext';

function NumericFilter() {
  const { filterByNumber, setFilterByNumber } = useContext(planetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('>');
  const [value, setValue] = useState(0);

  const handleClick = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };
    const filterList = filterByNumber.map((filter) => filter);
    filterList.push(newFilter);
    setFilterByNumber(filterList);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value=">">maior que</option>
        <option value="<">menor que</option>
        <option value="===">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="button"
        onClick={ handleClick }
        data-testid="button-filter"
      >
        Apply Filter
      </button>
      <div>
        {filterByNumber
          .map((filter) => (
            <p key={ filter.column }>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
          ))}
      </div>
    </div>
  );
}

export default NumericFilter;
