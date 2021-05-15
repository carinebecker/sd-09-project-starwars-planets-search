import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterNumeric() {
  const { filteredByNumeric, setFilteredByNumeric } = useContext(StarwarsContext);

  const columnSearchItems = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const columnComparisonValues = ['maior que', 'menor que', 'igual a'];

  let column = '';
  let comparison = '';
  let contextvalue = 0;

  // function removeElementFromSelect(event) {
  //   if(event.)
  // }

  function handleChange({ target }) {
    const { name, value } = target;
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
      console.log('Pesquisa Indisponível');
    }
  }

  function submit() {
    setFilteredByNumeric({
      ...filteredByNumeric,
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
          {columnSearchItems.map((item) => (
            <option value={ item } key={ item }>{item}</option>))}
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
        data-testid="button-filter"
        onClick={ submit }
      >
        Buscar
      </button>
    </div>
  );
}

export default FilterNumeric;
