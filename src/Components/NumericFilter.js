import React, { useContext, useState } from 'react';
import planetsContext from '../Context/planetsContext';

function NumericFilter() {
  const { filterByNumber, setFilterByNumber } = useContext(planetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const filterOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const handleAdd = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };
    const filterList = filterByNumber.map((filter) => filter);
    filterList.push(newFilter);
    setFilterByNumber(filterList);
  };

  const handleRemove = (name) => {
    const filterList = filterByNumber.filter((filter) => filter.column !== name);
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
        {filterOptions
          .filter((option) => {
            let answer = true;
            filterByNumber.forEach((filter) => {
              if (filter.column === option) answer = false;
            });
            return answer;
          }).map((option) => (<option key={ option }>{ option }</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
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
        onClick={ handleAdd }
        data-testid="button-filter"
      >
        Apply Filter
      </button>
      <div>
        {filterByNumber
          .map((filter) => (
            <div key={ filter.column }>
              <p>
                {`${filter.column} ${filter.comparison} ${filter.value}`}
              </p>
              <button
                type="button"
                data-testid="filter"
                name={ filter.column }
                onClick={ (e) => handleRemove(e.target.name) }
              >
                x
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default NumericFilter;
