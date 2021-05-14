import React, { useContext } from 'react';

import StarwarsContext from '../context/StarwarsContext';

function Form() {
  const {
    filterTypes,
    handleChange,
  } = useContext(StarwarsContext);
  const { filterByName, filterByNumericValues } = filterTypes.filters;
  // const { filters: { filterByName: { name } } } = filterTypes;

  /* console.log(filterByName);
  console.log(filterByNumericValues); */

  const columns = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const comparison = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <form action="">
        <label htmlFor="filter">
          Filtrar
          <input
            type="text"
            id="filter"
            name="name"
            value={ filterByName.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
        <select
          name="column"
          onChange={ handleChange }
          value={ filterByNumericValues.column }
          ata-testid="column-filter"
        >
          {columns.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <select
          name="comparison"
          onChange={ handleChange }
          value={ filterByNumericValues.comparison }
          data-testid="comparison-filter"
        >
          {comparison.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <input
          type="number"
          name="value"
          value={ filterByNumericValues.value }
          onChange={ handleChange }
          data-testid="value-filter"
        />
        <button type="button" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}

export default Form;

/* const [filterTypes, setFilterTypes] = useState({
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      }
    ]
  },
}); */
