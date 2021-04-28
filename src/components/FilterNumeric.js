import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterNumeric() {
  const { setFilteredByNumeric, filteredByNumeric } = useContext(StarwarsContext);
  const columnSearchItems = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const columnSearchValues = [
    'População', 'Período de Órbita',
    'Diâmetro', 'Período de Rotação',
    'Quantidade de água na superfície'];
  const columnComparisonValues = ['Maior que', 'Menor que', 'Igual a'];
  let column = '';
  let comparison = '';
  let contextvalue = 0;
  function handleChange({ target }) {
    const { name, value } = target;
    console.log(name, value);
    switch (name) {
    case 'column':
      column = value;
      break;
    case 'comparison':
      comparison = value;
      break;
    case 'value':
      contextvalue = value;
      break;
    default:
      console.log('Sem valores númericos');
    }
  }

  function submit() {
    console.log(contextvalue);
    setFilteredByNumeric({
      filterByNumeric: {
        column,
        comparison,
        value: contextvalue,
      },
    });
  }

  return (
    <div>
      <label htmlFor="columnSearch">
        Choose a Column to search for:
        <select
          id="columnSearch"
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
        >
          {columnSearchItems.map((item, index) => (
            <option value={ item } key={ item }>{columnSearchValues[[index]]}</option>))}
        </select>
      </label>
      <label htmlFor="columnComparison">
        <select
          id="columnComparison"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleChange }
        >
          {columnComparisonValues.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="Digite o número para comparação"
        name="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        onClick={ submit }
      >
        Buscar
      </button>
    </div>
  );
}

export default FilterNumeric;
