import React, { useContext } from 'react';
import TodoContext from './TodoContext';

function FilterPlanets() {
  const { column, setColumn, newData, setNewData, ValueColumn, setValueColumn,
    number, comparison, setComparison, setNumber } = useContext(TodoContext);
  const maiorOUMenor = ['maior que', 'menor que', 'igual a'];

  const addValueThreeFilter = ({ target }) => {
    if (target.name === 'column') setColumn(target.value);
    if (target.name === 'comparison') setComparison(target.value);
    if (target.name === 'num') setNumber(target.value);
  };

  const filterThree = () => {
    let dataWithFilter = [];
    if (comparison === 'maior que') {
      dataWithFilter = newData.filter((col) => parseFloat(col[column]) > number);
      setNewData(dataWithFilter);
    }
    if (comparison === 'menor que') {
      dataWithFilter = newData.filter((col) => parseFloat(col[column]) < number);
      setNewData(dataWithFilter);
    }
    if (comparison === 'igual a') {
      dataWithFilter = newData.filter((col) => col[column] === number);
      setNewData(dataWithFilter);
    }
    if (ValueColumn.length > 1) {
      const newValue = ValueColumn.filter((col) => col !== column);
      setValueColumn(newValue);
    }
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ addValueThreeFilter }
      >
        {ValueColumn.map((value, i) => (
          <option key={ i } value={ value }>{value}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ addValueThreeFilter }
      >
        {maiorOUMenor.map((value, i) => (
          <option key={ i } value={ value }>{value}</option>
        ))}
      </select>
      <label htmlFor="numero">
        <input
          name="num"
          type="number"
          id="numero"
          data-testid="value-filter"
          onChange={ addValueThreeFilter }
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ filterThree }>
        Filtrar
      </button>
    </div>
  );
}

export default FilterPlanets;
