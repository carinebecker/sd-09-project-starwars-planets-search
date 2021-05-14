import React, { useState, useContext } from 'react';

import StarwarsContext from '../context/StarwarsContext';

function Form() {
  const {
    filterTypes,
    handleChange,
    setFilterByNumericValues,
  } = useContext(StarwarsContext);
  const { filterByName, filterByNumericValues } = filterTypes.filters;

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleChangeNumericValues = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'column':
        setColumn(value);
        break;
      case 'comparison':
        setComparison(value);
        break;
      case 'value':
        setValue(value);
        break;
      default:
        break;
    }
  };

  const handleClickBtn = () => {
    const filterNumber = {
      column,
      comparison,
      value,
    };
    setFilterByNumericValues((prevState) => [...prevState, filterNumber]);
  };

  const columnsItems = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const comparisonItems = ['maior que', 'menor que', 'igual a'];
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
          onChange={ handleChangeNumericValues }
          value={ column }
          ata-testid="column-filter"
        >
          {columnsItems.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <select
          name="comparison"
          onChange={ handleChangeNumericValues }
          value={ comparison }
          data-testid="comparison-filter"
        >
          {comparisonItems.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <input
          type="number"
          name="value"
          value={ value }
          onChange={ handleChangeNumericValues }
          data-testid="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickBtn }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Form;
