import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function Filter(props) {
  const context = useContext(StarWarsContext);
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [value, setValue] = useState();

  const { colOptions } = props;

  const btnOnClick = () => {
    context.setNumFilter({
      column,
      comparison,
      value,
    });
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <StarWarsContext.Consumer>
          {
            ({ filters }) => {
              let options = colOptions;
              if (filters.filterByNumericValues.length > 0) {
                const choosen = filters.filterByNumericValues
                  .map((filter) => filter.column);
                choosen.forEach((choose) => {
                  options = options.filter((opt) => opt !== choose);
                });
              }
              return options
                .map((option) => <option key={ option }>{option}</option>);
            }
          }
        </StarWarsContext.Consumer>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => btnOnClick() }
      >
        Adicionar
      </button>
    </div>
  );
}

Filter.propTypes = {
  colOptions: PropTypes.arrayOf(String).isRequired,
};

export default Filter;
