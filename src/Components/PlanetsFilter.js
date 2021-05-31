import React, { useContext } from 'react';
import PlanetContext from '../Context/ContextPlanets';

function FilteringPlanets() {
  const { column, setColumn, newData, setNewData, ValueColumn, setValueColumn,
    number, setNumber, comparison, setComparison } = useContext(PlanetContext);
  const bigOrNot = ['maior que', 'menor que', 'igual a'];

  const filteringValue = ({ target }) => {
    if (target.name === 'column') setColumn(target.value);
    if (target.name === 'comparison') setComparison(target.value);
    if (target.name === 'num') setNumber(target.value);
  };

  const filteringThree = () => {
    let planetWithFilter = [];
    if (comparison === 'maior que') {
      planetWithFilter = newData.filter((col) => parseFloat(col[column]) > number);
      setNewData(planetWithFilter);
    }
    if (comparison === 'menor que') {
      planetWithFilter = newData.filter((col) => parseFloat(col[column]) < number);
      setNewData(planetWithFilter);
    }
    if (comparison === 'igual a') {
      planetWithFilter = newData.filter((col) => col[column] === number);
      setNewData(planetWithFilter);
    }
    if (ValueColumn.length > 1) {
      const valueNew = ValueColumn.filter((col) => col !== column);
      setValueColumn(valueNew);
    }
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        id="column"
        onChange={ filteringValue }
      >
        {ValueColumn.map((val, index) => (
          <option
            key={ index }
            value={ val }
          >
            {val}
          </option>
        ))}
      </select>
      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        onChange={ filteringValue }
      >
        {bigOrNot.map((val, i) => (
          <option
            key={ i }
            value={ val }
          >
            {val}
          </option>
        ))}
      </select>
      <label htmlFor="number">
        <input
          name="num"
          type="number"
          id="num"
          data-testid="value-filter"
          onChange={ filteringValue }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filteringThree }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilteringPlanets;
